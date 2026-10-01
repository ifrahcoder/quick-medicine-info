from app.services.groq_service import fetch_medicine_info_from_groq

async def get_or_create_medicine_info(medicine_name: str):
    # Seedha Groq AI se data fetch karega
    data = await fetch_medicine_info_from_groq(medicine_name)
    return data