import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function Stats({ studies }: { studies: { status: string; aiConfidence: number }[] }) {
  const completed = studies.filter((s) => s.status === "completed").length;
  const avg = Math.round(studies.reduce((a, s) => a + s.aiConfidence, 0) / Math.max(studies.length, 1));
  return <div className="grid gap-4 md:grid-cols-3"><Card><CardHeader><CardTitle>Total studies</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{studies.length}</CardContent></Card><Card><CardHeader><CardTitle>Completed AI jobs</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{completed}</CardContent></Card><Card><CardHeader><CardTitle>Avg confidence</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{avg}%</CardContent></Card></div>;
}
