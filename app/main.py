from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()
import os
from fastapi.middleware.cors import CORSMiddleware
import pdb;
from auth import JWTBearer

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


class User(BaseModel):
    email: str
    password: str

@app.post("/register")
async def register(user: User):
    response = supabase.auth.sign_up(email=user.email, password=user.password)
    return response

@app.get("/current_user")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    pdb.set_trace()
    print("hi")
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
    pdb.set_trace()
    if hasattr(response, 'error'):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "session": response.session}
