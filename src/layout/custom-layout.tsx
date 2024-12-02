// import { Footer } from "./components";
import type { ReactNode } from "react";
import Header from "./header";
import { Footer } from "./footer";

type MainLayoutProps = {
  children: ReactNode;
  bg?: "primary" | "secondary" | "white";
};

export const CustomLayout: React.FC<MainLayoutProps> = ({
  children,
  bg = "primary" as "primary" | "secondary" | "white",
}) => {
  return (
    <div className={`flex h-screen bg-bg-${bg} overflow-hidden`}>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

CustomLayout.displayName = "CustomLayout";
