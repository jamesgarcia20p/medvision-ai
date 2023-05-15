from pathlib import Path
from uuid import uuid4
from fastapi import UploadFile
from app.core.config import Settings

class StorageService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.local_root = Path(settings.local_storage_path)
        self.local_root.mkdir(parents=True, exist_ok=True)

    async def save_upload(self, file: UploadFile) -> str:
        suffix = Path(file.filename or "scan.bin").suffix
        key = f"studies/{uuid4()}{suffix}"
        target = self.local_root / key
        target.parent.mkdir(parents=True, exist_ok=True)
        with target.open("wb") as handle:
            while chunk := await file.read(1024 * 1024):
                handle.write(chunk)
        return key
