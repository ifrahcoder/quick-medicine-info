from fastapi import APIRouter, Depends
from app.database import get_database

router = APIRouter(prefix="/api/history", tags=["History"])

@router.get("/")
async def get_history(db=Depends(get_database)):
    cursor = db["history"].find().sort("searched_at", -1).limit(20)
    history_list = await cursor.to_list(length=20)
    for item in history_list:
        item["_id"] = str(item["_id"])
    return history_list

@router.delete("/")
async def clear_history(db=Depends(get_database)):
    await db["history"].delete_many({})
    return {"message": "History cleared successfully"}