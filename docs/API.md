# MedVisionAI API Documentation

Base URL: `http://localhost:8000/api/v1`

Interactive OpenAPI docs are available at `http://localhost:8000/docs` after the backend starts.

## REST endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Service health check. |
| `GET` | `/studies` | List patient imaging studies. |
| `GET` | `/studies/{study_id}` | Fetch one study with status and AI metrics. |
| `POST` | `/uploads` | Multipart upload for DICOM, NIfTI, CT, and MRI files. |
| `POST` | `/ai/segment/{study_id}` | Start a MONAI/PyTorch tumor segmentation job. |
| `GET` | `/reports/{study_id}` | Return AI-generated radiology summary and impression bullets. |
| `GET` | `/exports/{study_id}/mask` | Return export metadata for segmentation masks. |

## WebSocket endpoints

`WS /api/v1/ws/segmentations/{job_id}` streams segmentation progress events:

```json
{ "jobId": "seg_study_ct_chest_001", "progress": 64, "status": "processing" }
```

## Upload example

```bash
curl -F "patient_name=Demo Patient" \
  -F "files=@scan.dcm" \
  http://localhost:8000/api/v1/uploads
```

## Segmentation example

```bash
curl -X POST http://localhost:8000/api/v1/ai/segment/study_ct_chest_001
```
