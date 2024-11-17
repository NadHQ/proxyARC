import asyncio
import time

from bson import ObjectId
from src.core.mongo import database
from src.core.redis import redis


async def create_url(data: dict):
    collection = database["urls"]
    result = await collection.find_one(data)
    if result:
        return result
    result = await collection.insert_one(data)
    return result


async def get_urls():
    collection = database["urls"]
    result = []
    cursor = collection.find()
    async for item in cursor:
        item["id"] = str(item["_id"])
        result.append(item)
    return result


async def get_max_requests(path: str) -> int:
    collection = database["urls"]

    result = await collection.find_one({"url": path})
    if not result:
        new_insert = await collection.insert_one({"url": path, "max_of_requests": 50})
        result = await collection.find_one({"_id": new_insert.inserted_id})
    return result.get("max_of_requests")


async def rate_limiter(path: str, window_size: int, max_requests: int):
    key = f"rate_limit:{path}"
    current_count = await redis.get(key)
    if not current_count:
        # Увеличиваем счетчик запросов
        current_count = await redis.incr(key)
    else:
        if int(current_count) > max_requests:
            ttl = await redis.ttl(key)  # Оставшееся время до сброса лимита
            return False, ttl
        asyncio.create_task(redis.incr(key))
    # Если ключ создан впервые, устанавливаем TTL
    if current_count == 1:
        await redis.expire(key, window_size)

    return True, None


async def get_url_statistics():
    collection = database["urls"]
    result = []
    cursor = collection.find()
    async for item in cursor:
        number_of_requests = await redis.get(f'rate_limit:{item["url"]}')
        item.pop("_id")
        item["used_requests"] = number_of_requests if number_of_requests else 0
        result.append(item)
    return result


async def update_urls_data(data: dict):
    collection = database["urls"]
    object_id = ObjectId(data["id"])
    result = await collection.update_one(
        {"_id": object_id},
        {"$set": {"url": data["url"], "max_of_requests": data["max_of_requests"]}},
    )
    return result.modified_count
