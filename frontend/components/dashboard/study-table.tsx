import Link from "next/link";
import type { PatientStudy } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StudyTable({ studies }: { studies: PatientStudy[] }) {
  return <Card><CardHeader><CardTitle>Patient studies</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-muted-foreground"><tr><th className="py-3">Patient</th><th>Modality</th><th>Body part</th><th>Status</th><th>AI</th><th /></tr></thead><tbody>{studies.map((study) => <tr key={study.id} className="border-t"><td className="py-3 font-medium">{study.patientName}</td><td>{study.modality}</td><td>{study.bodyPart}</td><td><span className="rounded-full bg-accent px-2 py-1 text-xs">{study.status}</span></td><td>{study.aiConfidence}%</td><td className="text-right"><Button asChild size="sm"><Link href={`/studies/${study.id}`}>Review</Link></Button></td></tr>)}</tbody></table></div></CardContent></Card>;
}
