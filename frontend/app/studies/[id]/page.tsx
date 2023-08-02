import { api } from "@/lib/api";
import { DicomViewer } from "@/components/medical/dicom-viewer";
import { ReconstructionViewer } from "@/components/medical/reconstruction-viewer";
import { ReportSummary } from "@/components/medical/report-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function StudyPage({ params }: { params: { id: string } }) {
  const [study, report] = await Promise.all([api.study(params.id), api.report(params.id)]);
  return <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]"><div className="space-y-6"><div><h1 className="text-3xl font-bold">{study.patientName}</h1><p className="text-muted-foreground">{study.modality} • {study.bodyPart} • {study.studyDate}</p></div><DicomViewer studyId={study.id} /></div><aside className="space-y-6"><Card><CardHeader><CardTitle>Segmentation job</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between text-sm"><span>Status</span><span>{study.status}</span></div><Progress value={study.aiConfidence} /><p className="text-sm text-muted-foreground">Tumor volume: {study.tumorVolumeMl ?? 0} ml. Export masks as NIfTI or DICOM SEG from the backend.</p></CardContent></Card><ReconstructionViewer /><ReportSummary {...report} /></aside></main>;
}
