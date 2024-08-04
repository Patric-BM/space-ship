"use client";
import { useRef, useEffect } from "react";
import { CanvasManager } from "./CanvasManager";

export default function Home() {
  const canvasManagerRef = useRef<CanvasManager | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    canvasManagerRef.current = new CanvasManager(canvas.current!);
    canvasManagerRef.current?.init();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Home</h1>
      <canvas
        id="canvas"
        ref={canvas}
        width="800"
        height="600"
        className="border-2 border-black"
      ></canvas>
    </main>
  );
}
