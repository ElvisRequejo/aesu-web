/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ['msciampcygamyijddwxc.supabase.co'],
    // Opcional: también puedes usar remotePatterns para más control
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'msciampcygamyijddwxc.supabase.co',
    //     port: '',
    //     pathname: '/storage/v1/object/public/**',
    //   },
    // ],
  },
};

export default config;