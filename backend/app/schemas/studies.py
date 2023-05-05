from datetime import date, datetime
from enum import Enum
from pydantic import BaseModel, Field

class StudyStatus(str, Enum):
    queued = "queued"
    processing = "processing"
    review = "review"
    completed = "completed"

class Modality(str, Enum):
    CT = "CT"
    MRI = "MRI"
    PET = "PET"
    XRAY = "XRAY"

class PatientStudy(BaseModel):
    id: str
    patientName: str
    modality: Modality
    bodyPart: str
    studyDate: date
    status: StudyStatus
    aiConfidence: int = Field(ge=0, le=100)
    seriesCount: int
    tumorVolumeMl: float | None = None

class SegmentationJob(BaseModel):
    id: str
    studyId: str
    status: StudyStatus
    progress: int = Field(ge=0, le=100)
    model: str
    createdAt: datetime

class ReportSummary(BaseModel):
    summary: str
    impression: list[str]
