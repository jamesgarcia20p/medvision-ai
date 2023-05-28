from app.schemas.studies import PatientStudy, ReportSummary

class ReportService:
    def summarize(self, study: PatientStudy) -> ReportSummary:
        return ReportSummary(
            summary=f"{study.modality} {study.bodyPart} study processed by MedVisionAI. AI findings should be validated by a licensed radiologist.",
            impression=["AI segmentation mask is ready for overlay review.", f"Estimated confidence: {study.aiConfidence}%.", "Clinical correlation and prior comparison recommended."],
        )
