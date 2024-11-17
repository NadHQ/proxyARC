from functools import lru_cache

from pydantic.v1 import BaseSettings


class AppConfig(BaseSettings):
    redis_url: str
    target_server: str
    mongo: str

    class Config:
        env_file = ".env"


@lru_cache
def get_app_config() -> AppConfig:
    return AppConfig()
