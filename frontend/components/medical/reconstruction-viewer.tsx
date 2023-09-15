"use client";
import { useEffect, useRef } from "react";

export function ReconstructionViewer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let mounted = true;
    async function initVtk() {
      await import("vtk.js/Sources/favicon");
      if (mounted && ref.current) ref.current.dataset.renderer = "vtk.js-ready";
    }
    initVtk();
    return () => { mounted = false; };
  }, []);
  return <div ref={ref} className="grid h-80 place-items-center rounded-xl border bg-[conic-gradient(from_120deg,rgba(20,184,166,.35),rgba(59,130,246,.18),rgba(168,85,247,.25),rgba(20,184,166,.35))]"><div className="rounded-xl bg-background/80 p-4 text-center backdrop-blur"><p className="font-semibold">vtk.js 3D reconstruction</p><p className="text-sm text-muted-foreground">Surface mesh and segmentation mask preview</p></div></div>;
}
