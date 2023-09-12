"use client";
import { useEffect, useRef, useState } from "react";
import { Ruler, ScanLine, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DicomViewer({ studyId }: { studyId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState("window");
  useEffect(() => {
    let mounted = true;
    async function initCornerstone() {
      const cornerstone = await import("@cornerstonejs/core");
      if (mounted && ref.current) {
        ref.current.dataset.engine = cornerstone.Enums.Events.IMAGE_RENDERED;
      }
    }
    initCornerstone();
    return () => { mounted = false; };
  }, []);
  return <section className="rounded-xl border bg-black p-3 text-white"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div className="text-sm text-emerald-300">Study {studyId} • Cornerstone.js viewport</div><div className="flex gap-2"><Button size="sm" variant={tool === "measure" ? "default" : "secondary"} onClick={() => setTool("measure")}><Ruler className="mr-1 h-4 w-4" />Measure</Button><Button size="sm" variant={tool === "zoom" ? "default" : "secondary"} onClick={() => setTool("zoom")}><ZoomIn className="mr-1 h-4 w-4" />Zoom</Button><Button size="sm" variant={tool === "annotate" ? "default" : "secondary"} onClick={() => setTool("annotate")}><ScanLine className="mr-1 h-4 w-4" />Annotate</Button></div></div><div ref={ref} className="viewer-grid grid h-[520px] place-items-center rounded-lg border border-emerald-500/30 bg-[radial-gradient(circle,rgba(148,163,184,.55),transparent_35%),radial-gradient(circle_at_58%_45%,rgba(244,63,94,.55),transparent_10%)]"><div className="rounded bg-black/70 px-4 py-2 text-center"><p className="font-semibold">AI tumor segmentation overlay</p><p className="text-xs text-muted-foreground">Active tool: {tool}</p></div></div></section>;
}
