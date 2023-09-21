export type StudyStatus = "queued" | "processing" | "review" | "completed";

export interface PatientStudy {
  id: string;
  patientName: string;
  modality: "CT" | "MRI" | "PET" | "XRAY";
  bodyPart: string;
  studyDate: string;
  status: StudyStatus;
  aiConfidence: number;
  seriesCount: number;
  tumorVolumeMl?: number;
}

export interface SegmentationJob {
  id: string;
  studyId: string;
  status: StudyStatus;
  progress: number;
  model: string;
  createdAt: string;
}
