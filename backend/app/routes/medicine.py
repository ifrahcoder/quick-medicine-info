from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.medicine_service import get_or_create_medicine_info

router = APIRouter()

class MedicineRequest(BaseModel):
    medicineName: str

@router.post("/medicine-details")
async def get_medicine_details(request: MedicineRequest):
    try:
        # Baghair database ke seedha medicine name pass kiya ja raha hai
        data = await get_or_create_medicine_info(medicine_name=request.medicineName)
        return data
    except Exception as e:
        print(f"Route Error in /medicine-details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))