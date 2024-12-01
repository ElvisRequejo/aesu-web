"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { supabase } from "~/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function CreateEventForm() {
  const { data: session, status } = useSession();
  const [isPast, setIsPast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      toast.success("Evento creado exitosamente");
      formRef.current?.reset();
      setError(null);
      setSelectedFiles([]);
      setPreviewUrls([]);
    },
    onError: (error) => {
      toast.error(error.message);
      setError(error.message);
    },
  });

  // Verificar la sesión de Supabase al cargar
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setError("Debes iniciar sesión para crear eventos");
      }
    };

    void checkSession();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validar número máximo de archivos
    if (selectedFiles.length + files.length > 10) {
      toast.error("No puedes subir más de 10 imágenes");
      return;
    }

    // Validar tamaño y tipo de archivos
    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} es demasiado grande. Máximo 5MB`);
        return false;
      }
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} no es una imagen válida`);
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);

    // Crear URLs de preview
    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      const urlToRevoke = prev[index];
      if (urlToRevoke) {
        URL.revokeObjectURL(urlToRevoke);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;

        // Verificar el tipo y tamaño del archivo
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("El archivo es demasiado grande. Máximo 5MB");
        }
        if (!file.type.startsWith("image/")) {
          throw new Error("Solo se permiten archivos de imagen");
        }

        // Intentar subir el archivo
        const { data, error } = await supabase.storage
          .from("event-images")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Error al subir archivo:", error);
          throw new Error(`Error al subir ${file.name}: ${error.message}`);
        }

        // Obtener la URL pública
        const {
          data: { publicUrl },
        } = supabase.storage.from("event-images").getPublicUrl(fileName);

        return publicUrl;
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error en uploadImages:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "loading") return;

    if (!session?.user) {
      toast.error("Debes iniciar sesión para crear eventos");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        imageUrls = await uploadImages(selectedFiles);
      }

      const eventData = {
        title: formData.get("title") as string,
        subtitle: (formData.get("subtitle") as string) || null,
        description: (formData.get("description") as string) || null,
        date: (formData.get("date") as string) || null,
        time: (formData.get("time") as string) || null,
        location: (formData.get("location") as string) || null,
        isPast,
        images: imageUrls,
        createdById: session.user.id,
      };

      if (isPast) {
        await createEvent.mutateAsync({
          ...eventData,
          results: (formData.get("results") as string) || null,
        });
      } else {
        await createEvent.mutateAsync({
          ...eventData,
          platform: (formData.get("platform") as string) || null,
          link: (formData.get("link") as string) || null,
        });
      }
    } catch (err) {
      console.error("Error al crear evento:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error al crear el evento";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si no hay sesión, mostrar mensaje
  if (status === "unauthenticated") {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-600">
            Debes iniciar sesión para crear eventos
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nuevo Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isPast}
              onCheckedChange={setIsPast}
              id="event-type"
              disabled={isSubmitting}
            />
            <Label htmlFor="event-type">Evento Pasado</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input id="title" name="title" required disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input id="subtitle" name="subtitle" disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                name="date"
                type="date"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                name="time"
                type="time"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lugar</Label>
            <Input id="location" name="location" disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Imágenes</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="cursor-pointer"
            />

            {/* Preview de imágenes */}
            {previewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {previewUrls.map((url, index) => (
                  <div key={url} className="group relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isPast && (
            <>
              <div className="space-y-2">
                <Label htmlFor="platform">Plataforma</Label>
                <Input id="platform" name="platform" disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  name="link"
                  type="url"
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {isPast && (
            <div className="space-y-2">
              <Label htmlFor="results">Resultados</Label>
              <Textarea id="results" name="results" disabled={isSubmitting} />
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creando evento..." : "Crear Evento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
