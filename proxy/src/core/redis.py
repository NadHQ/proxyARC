from config import get_app_config
from redis import asyncio as aioredis

redis_pool = aioredis.ConnectionPool.from_url(
    url=get_app_config().redis_url, max_connections=10
)
redis = aioredis.Redis(connection_pool=redis_pool)
