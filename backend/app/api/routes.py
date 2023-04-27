from fastapi import APIRouter, File, Form, HTTPException, UploadFile, WebSocket, WebSocketDisconnect
from app.core.config import get_settings
from app.schemas.studies import PatientStudy, ReportSummary, SegmentationJob
from app.services.demo_data import REPORTS, STUDIES, make_job
from app.services.reports import ReportService
from app.services.segmentation import MonaiSegmentationService
from app.services.storage import StorageService

router = APIRouter()
segmentation_service = MonaiSegmentationService()
report_service = ReportService()

@router.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok", "service": "medvision-ai-api"}

@router.get("/studies", response_model=list[PatientStudy], tags=["studies"])
def list_studies() -> list[PatientStudy]:
    return STUDIES

@router.get("/studies/{study_id}", response_model=PatientStudy, tags=["studies"])
def get_study(study_id: str) -> PatientStudy:
    for study in STUDIES:
        if study.id == study_id:
            return study
    raise HTTPException(status_code=404, detail="Study not found")

@router.post("/uploads", tags=["uploads"])
async def upload_study(patient_name: str = Form(...), files: list[UploadFile] = File(...)) -> dict[str, object]:
    storage = StorageService(get_settings())
    keys = [await storage.save_upload(file) for file in files]
    return {"patientName": patient_name, "storedObjects": keys, "status": "queued"}

@router.post("/ai/segment/{study_id}", response_model=SegmentationJob, tags=["ai"])
async def start_segmentation(study_id: str) -> SegmentationJob:
    _ = await segmentation_service.run(study_id)
    return make_job(study_id)

@router.get("/reports/{study_id}", response_model=ReportSummary, tags=["reports"])
def report(study_id: str) -> ReportSummary:
    if study_id in REPORTS:
        return REPORTS[study_id]
    study = get_study(study_id)
    return report_service.summarize(study)

@router.get("/exports/{study_id}/mask", tags=["exports"])
def export_mask(study_id: str) -> dict[str, str]:
    return {"studyId": study_id, "format": "NIfTI", "downloadUrl": f"/api/v1/downloads/{study_id}/mask.nii.gz"}

@router.websocket("/ws/segmentations/{job_id}")
async def segmentation_progress(websocket: WebSocket, job_id: str) -> None:
    await websocket.accept()
    try:
        for progress in [5, 18, 37, 64, 82, 100]:
            await websocket.send_json({"jobId": job_id, "progress": progress, "status": "completed" if progress == 100 else "processing"})
    except WebSocketDisconnect:
        return
    finally:
        await websocket.close()
