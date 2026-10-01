import os
import json
import httpx
from dotenv import load_dotenv
import os
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

async def fetch_medicine_info_from_groq(medicine_name: str):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "openai/gpt-oss-20b",  # Updated active Groq model ID
        "messages": [
            {
                "role": "system",
                "content": "You are a professional medical assistant. You must output ONLY a valid JSON object with these exact keys: name (string), subtitle (string), forms (string), category (string), strength (string), manufacturer (string), uses (array of strings), howItWorks (string), sideEffects (array of strings), precautions (array of strings), whenToDoctor (array of strings). Do not include any markdown formatting like ```json."
            },
            {
                "role": "user",
                "content": f"Provide accurate medical details for the medicine: {medicine_name}"
            }
        ],
        "response_format": {"type": "json_object"}
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(url, json=payload, headers=headers)
            
            if response.status_code != 200:
                print(f"Groq API Error Response: {response.text}")
                raise Exception(f"Groq API returned status {response.status_code}")

            data = response.json()
            if "choices" in data and len(data["choices"]) > 0:
                content = data["choices"][0]["message"]["content"]
                return json.loads(content)
            else:
                return {"error": "Invalid response structure from Groq AI"}
                
        except Exception as e:
            print(f"CRITICAL GROQ EXCEPTION: {str(e)}")
            return {
                "name": medicine_name,
                "subtitle": "AI Response Error Fallback",
                "forms": "Tablet",
                "category": "General",
                "strength": "Standard",
                "manufacturer": "Various",
                "uses": ["Could not fetch uses due to API error."],
                "howItWorks": "Please consult your doctor.",
                "sideEffects": ["Check with a healthcare professional."],
                "precautions": ["Follow standard medical guidelines."],
                "whenToDoctor": ["If symptoms persist."]
            }