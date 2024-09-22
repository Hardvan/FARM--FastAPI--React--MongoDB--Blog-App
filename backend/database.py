from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://localhost:27017/blog_db"

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.blog_db
post_collection = database.get_collection("posts")
