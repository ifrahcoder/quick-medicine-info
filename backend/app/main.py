from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import medicine, history

app = FastAPI()

# CORS Middleware (React frontend se connection ke liye lazmi hai)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router include karte waqt prefix check karein
app.include_router(medicine.router, prefix="/api", tags=["Medicine"])
app.include_router(history.router, prefix="/api", tags=["History"])

@app.get("/")
def read_root():
    return {"message": "FastAPI Groq AI Backend is Running"}