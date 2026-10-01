from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class MedicineQuery(BaseModel):
    name: str

class MedicineResponse(BaseModel):
    medicine_name: str
    medicine_category: str
    common_uses: List[str]
    how_it_works: str
    common_side_effects: List[str]
    important_precautions: List[str]
    when_to_contact_doctor: List[str]
    simple_explanation: str
    searched_at: Optional[str] = None