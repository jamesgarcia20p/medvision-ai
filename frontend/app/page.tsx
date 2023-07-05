import Link from "next/link";
import { Brain, Cuboid, FileScan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return <main className="mx-auto max-w-7xl px-4 py-16">
    <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div><p className="mb-4 inline-flex rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">MONAI segmentation • DICOM • 3D reconstruction</p><h1 className="text-5xl font-bold tracking-tight md:text-7xl">AI medical imaging workflows for clinical research teams.</h1><p className="mt-6 max-w-2xl text-lg text-muted-foreground">Upload DICOM, NIfTI, CT, and MRI studies, run tumor segmentation, review overlays, annotate anatomy, generate radiology summaries, and export masks.</p><div className="mt-8 flex gap-3"><Button asChild size="lg"><Link href="/dashboard">Open dashboard</Link></Button><Button asChild variant="outline" size="lg"><Link href="/upload">Upload scan</Link></Button></div></div>
      <div className="viewer-grid rounded-3xl border bg-card p-6 shadow-2xl"><div className="rounded-2xl bg-black p-4 text-emerald-300"><div className="mb-3 flex justify-between text-xs"><span>CT AXIAL • Series 4</span><span>AI mask 92%</span></div><div className="grid h-80 place-items-center rounded-xl border border-emerald-500/30 bg-[radial-gradient(circle,rgba(16,185,129,.45),transparent_28%),radial-gradient(circle_at_65%_40%,rgba(244,63,94,.55),transparent_12%)]"><span className="rounded bg-black/60 px-3 py-1 text-sm">Segmentation overlay active</span></div></div></div>
    </section>
    <section className="mt-16 grid gap-4 md:grid-cols-3">{[[FileScan,"DICOM-native viewer"],[Brain,"MONAI tumor AI"],[Cuboid,"vtk.js 3D anatomy"]].map(([Icon,title]) => <Card key={String(title)}><CardHeader><Icon className="h-8 w-8 text-primary" /><CardTitle>{String(title)}</CardTitle></CardHeader><CardContent className="text-muted-foreground">Responsive tooling with loading states, real-time progress, annotations, measurements, and export-ready outputs.</CardContent></Card>)}</section>
  </main>;
}
