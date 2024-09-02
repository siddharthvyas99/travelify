from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()
import os
from fastapi.middleware.cors import CORSMiddleware
import pdb;
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
# from auth import JWTBearer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust the origin to match your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Mount the directory containing the built Next.js application
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve the entry point of the Next.js application
@app.get("/{full_path:path}")
async def serve_static(full_path: str):
    # If no path is provided, serve the default Next.js page
    if not full_path:
        full_path = "index.html"
    
    file_path = os.path.join("static", full_path)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        # Return a 404 page if the file is not found
        return FileResponse("static/404.html", status_code=404)

class User(BaseModel):
    email: str
    password: str

@app.post("/register")
async def register(user: User):
    response = supabase.auth.sign_up(email=user.email, password=user.password)
    return response

@app.get("/current_user")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        user_response = supabase.auth.api.get_user(token)
        if user_response.get("error"):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return user_response
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


@app.post("/login")
async def login(user: User):
    response = supabase.auth.sign_in_with_password({ "email": user.email, "password": user.password })
    if hasattr(response, 'error'):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "session": response.session}
