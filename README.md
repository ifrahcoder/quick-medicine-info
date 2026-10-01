# Agar backend folder mein nahi hain toh wahan jayein
cd C:\Users\M.Rizwan\quick-medicine-info\backend

# Agar virtual environment activate nahi hai toh activate karein
venv\Scripts\Activate

# Server run karein
uvicorn app.main:app --reload
npm run dev