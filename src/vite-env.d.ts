/// <reference types="vite/client" />

declare module "react-dom/client" {
  import type { ReactNode } from "react";
  export function createRoot(container: HTMLElement): {
    render(children: ReactNode): void;
    unmount(): void;
  };
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.mp4" {
  const src: string;
  export default src;
}
declare module "*.webm" {
  const src: string;
  export default src;
}

// Alias path asset modules (Vite @ -> src)
declare module "@/assets/logo.jpeg" {
  const src: string;
  export default src;
}
declare module "@/assets/loader.mp4" {
  const src: string;
  export default src;
}
declare module "@/assets/initial-video.mp4" {
  const src: string;
  export default src;
}
