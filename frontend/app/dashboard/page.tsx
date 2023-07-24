import { api } from "@/lib/api";
import { Stats } from "@/components/dashboard/stats";
import { StudyTable } from "@/components/dashboard/study-table";

export default async function DashboardPage() {
  const studies = await api.studies().catch(() => []);
  return <main className="mx-auto max-w-7xl space-y-8 px-4 py-8"><div><h1 className="text-3xl font-bold">Clinical dashboard</h1><p className="text-muted-foreground">Manage studies, AI processing, annotations, and radiology summaries.</p></div><Stats studies={studies} /><StudyTable studies={studies} /></main>;
}
