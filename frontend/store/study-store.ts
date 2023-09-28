import { create } from "zustand";
import type { PatientStudy, SegmentationJob } from "@/lib/types";

type StudyState = {
  selectedStudy?: PatientStudy;
  segmentationJob?: SegmentationJob;
  setSelectedStudy: (study: PatientStudy) => void;
  setSegmentationJob: (job: SegmentationJob) => void;
  updateProgress: (progress: number) => void;
};

export const useStudyStore = create<StudyState>((set) => ({
  setSelectedStudy: (study) => set({ selectedStudy: study }),
  setSegmentationJob: (job) => set({ segmentationJob: job }),
  updateProgress: (progress) => set((state) => state.segmentationJob ? { segmentationJob: { ...state.segmentationJob, progress } } : state)
}));
