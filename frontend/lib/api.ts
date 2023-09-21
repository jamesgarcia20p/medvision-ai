import { apiBaseUrl } from "@/lib/utils";
import type { PatientStudy, SegmentationJob } from "@/lib/types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBaseUrl}${path}`, { ...init, headers: { "Content-Type": "application/json", ...init?.headers }, cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export const api = {
  studies: () => request<PatientStudy[]>("/api/v1/studies"),
  study: (id: string) => request<PatientStudy>(`/api/v1/studies/${id}`),
  startSegmentation: (studyId: string) => request<SegmentationJob>(`/api/v1/ai/segment/${studyId}`, { method: "POST" }),
  report: (studyId: string) => request<{ summary: string; impression: string[] }>(`/api/v1/reports/${studyId}`)
};
