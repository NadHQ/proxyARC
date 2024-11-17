from config import get_app_config
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(get_app_config().mongo)
database = client.get_database("admin")
