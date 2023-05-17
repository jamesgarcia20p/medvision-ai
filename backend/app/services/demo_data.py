from datetime import date, datetime, timezone
from app.schemas.studies import Modality, PatientStudy, ReportSummary, SegmentationJob, StudyStatus

STUDIES = [
    PatientStudy(id="study_ct_chest_001", patientName="Avery Chen", modality=Modality.CT, bodyPart="Chest", studyDate=date.today(), status=StudyStatus.completed, aiConfidence=94, seriesCount=4, tumorVolumeMl=12.8),
    PatientStudy(id="study_mri_brain_002", patientName="Morgan Patel", modality=Modality.MRI, bodyPart="Brain", studyDate=date.today(), status=StudyStatus.review, aiConfidence=88, seriesCount=6, tumorVolumeMl=6.4),
    PatientStudy(id="study_ct_abdomen_003", patientName="Riley Johnson", modality=Modality.CT, bodyPart="Abdomen", studyDate=date.today(), status=StudyStatus.processing, aiConfidence=61, seriesCount=3, tumorVolumeMl=None),
]

REPORTS = {
    study.id: ReportSummary(
        summary=f"AI-assisted report for {study.patientName} highlights suspected lesion candidates and quantitative mask metrics. This is decision support only and requires radiologist sign-off.",
        impression=["Segmentation overlay is available for review.", f"Model confidence is {study.aiConfidence}%.", "Exportable mask can be generated as NIfTI or DICOM SEG."],
    ) for study in STUDIES
}

def make_job(study_id: str) -> SegmentationJob:
    return SegmentationJob(id=f"seg_{study_id}", studyId=study_id, status=StudyStatus.processing, progress=12, model="MONAI SwinUNETR tumor-seg-v1", createdAt=datetime.now(timezone.utc))
