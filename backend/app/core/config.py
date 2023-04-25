from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "MedVisionAI API"
    api_prefix: str = "/api/v1"
    database_url: str = "postgresql://medvision:medvision@localhost:5432/medvision_ai"
    cors_origins: str = "http://localhost:3000"
    storage_provider: str = "local"
    local_storage_path: str = "uploads"
    s3_bucket: str | None = None
    aws_region: str = "us-east-1"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

@lru_cache
def get_settings() -> Settings:
    return Settings()
