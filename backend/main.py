import os
from pydantic import BaseModel

from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware

from file_parser import extract_pdf, extract_docx
from skill_extractor import extract_skills
from matcher import match_skills


app = FastAPI()


# Allow frontend (React) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


UPLOAD_FOLDER = "resumes"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


resume_text = ""
jd_text = ""
users = []
class AnalyzeRequest(BaseModel):
    resume_text: str
    jd_text: str
class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str
class LoginRequest(BaseModel):
    email: str
    password: str


# ---------------- Home Route ----------------
@app.get("/")
def home():
    return {"message": "SkillMatch API is running"}


# ---------------- Upload Resume ----------------
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    global resume_text

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith(".pdf"):
        resume_text = extract_pdf(file_path)

    elif file.filename.endswith(".docx"):
        resume_text = extract_docx(file_path)

    else:
        return {"error": "Only PDF and DOCX files are supported"}

    return {
        "message": "Resume uploaded successfully",
        "text": resume_text
    }


# ---------------- Upload Job Description ----------------
@app.post("/upload-jd")
async def upload_jd(file: UploadFile = File(...)):

    global jd_text

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith(".pdf"):
        jd_text = extract_pdf(file_path)

    elif file.filename.endswith(".docx"):
        jd_text = extract_docx(file_path)

    else:
        return {"error": "Only PDF and DOCX files are supported"}

    return {
        "message": "JD uploaded successfully",
        "text": jd_text
    }

@app.post("/register")
def register(user: RegisterRequest):

    for u in users:
        if u["email"] == user.email:
            return {"error": "Email already registered"}

    users.append({
        "username": user.username,
        "email": user.email,
        "password": user.password
    })

    return {"message": "Registration successful"}

@app.post("/login")
def login(user: LoginRequest):

    for u in users:
        if u["email"] == user.email and u["password"] == user.password:
            return {"username": u["username"]}

    return {"error": "Invalid email or password"}

# ---------------- Analyze Resume vs JD ----------------

@app.post("/analyze")
def analyze(data: AnalyzeRequest):

    resume_text_input = data.resume_text
    jd_text_input = data.jd_text

    resume_skills = extract_skills(resume_text_input)
    jd_skills = extract_skills(jd_text_input)

    result = match_skills(resume_skills, jd_skills)

    return {

        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "matched_skills": result["matched"],
        "missing_skills": result["missing"],
        "suggestions": result["suggestions"],
        "match_score": result["score"]

    }