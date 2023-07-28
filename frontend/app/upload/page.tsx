import { UploadCloud } from "lucide-react";
import { apiBaseUrl } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadPage() {
  return <main className="mx-auto max-w-4xl px-4 py-8"><Card><CardHeader><CardTitle>Upload imaging study</CardTitle></CardHeader><CardContent><form action={`${apiBaseUrl}/api/v1/uploads`} method="post" encType="multipart/form-data" className="grid gap-6"><label className="grid cursor-pointer place-items-center rounded-2xl border border-dashed p-12 text-center hover:bg-accent"><UploadCloud className="mb-3 h-10 w-10 text-primary" /><span className="font-semibold">Drop DICOM, NIfTI, CT, or MRI files</span><span className="text-sm text-muted-foreground">.dcm, .nii, .nii.gz, zipped series supported</span><input className="sr-only" name="files" type="file" multiple /></label><input name="patient_name" placeholder="Patient display name" className="rounded-md border bg-background px-3 py-2" /><button className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">Upload and start triage</button></form></CardContent></Card></main>;
}
