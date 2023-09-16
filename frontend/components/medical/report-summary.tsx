import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function ReportSummary({ summary, impression }: { summary: string; impression: string[] }) {
  return <Card><CardHeader><CardTitle>AI radiology report summary</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{summary}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-sm">{impression.map((item) => <li key={item}>{item}</li>)}</ul></CardContent></Card>;
}
