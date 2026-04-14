# SkillMatch – Resume Matcher and Skill Recommender

## Overview
SkillMatch is an AI-powered web application that analyzes a candidate’s resume and compares it with a job description to determine how well the resume matches the job requirements. It also identifies missing skills and recommends improvements using Natural Language Processing (NLP).

The system helps job seekers understand their strengths and the skills they need to improve for better job opportunities.

---

## Key Features
- Resume upload (PDF / DOCX)
- Job description input
- Automatic skill extraction using NLP
- Resume–job similarity score calculation
- Matched skills detection
- Missing skills identification
- Skill recommendations
- Interactive dashboard visualization

---

## Technology Stack

### Frontend
- React.js
- JavaScript
- CSS

### Backend
- FastAPI
- Python

### NLP / Machine Learning
- SpaCy
- NLTK
- Scikit-learn
- TF-IDF Vectorization
- Cosine Similarity

### Tools
- Docker
- Git & GitHub

---

## Project Structure

```
Resume-Matcher_and_Skill-Recommender
│
├── backend
│   ├── main.py
│   ├── matcher.py
│   ├── nlp_processing.py
│   ├── skill_extractor.py
│   ├── file_parser.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   └── App.jsx
│
├── package.json
└── README.md
```

---

## System Architecture

```
User Resume
      │
      ▼
Resume Parsing
      │
      ▼
NLP Skill Extraction
      │
      ▼
TF-IDF Vectorization
      │
      ▼
Cosine Similarity
      │
      ▼
Match Score + Missing Skills
      │
      ▼
Dashboard Visualization
```

---

## Implementation Steps

1. The user uploads a resume file.
2. The user enters a job description.
3. The backend parses the resume using Python.
4. NLP techniques extract skills from both resume and job description.
5. TF-IDF vectorization converts text into numerical vectors.
6. Cosine similarity calculates the match score.
7. The dashboard displays:
   - Resume summary
   - Job description summary
   - Matched skills
   - Missing skills
   - Skill recommendations

---

## How to Run the Project

### Clone the Repository
```bash
git clone https://github.com/Madhurima776/Resume-Matcher_and_Skill-Recommender.git
```

### Run Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Run Frontend
```bash
cd frontend
npm install
npm start
```

---

## Screenshots

### Register Page
(Add screenshot here)<img width="1866" height="839" alt="Screenshot 2026-03-10 105943" src="https://github.com/user-attachments/assets/ee1d72f1-b6fb-4d15-919d-f7a50152a3d3" />



### Login Page
(Add screenshot here)<img width="819" height="743" alt="Screenshot 2026-03-10 110128" src="https://github.com/user-attachments/assets/4d804b59-deac-4447-a174-18aeead63260" />


### Dashboard
(Add screenshot here)<img width="1897" height="732" alt="Screenshot 2026-03-10 110952" src="https://github.com/user-attachments/assets/1c7189db-c8ea-466a-85b0-8b587cb45bd3" />


### Skill Match Result
(Add screenshot here)<img width="1920" height="925" alt="Screenshot 2026-03-06 222657" src="https://github.com/user-attachments/assets/631e22e2-610e-41d6-a892-785c514807c2" />


---

## Live Demo
[http://localhost:5173/]

## Future Improvements
- AI-based resume improvement suggestions
- Job recommendation system
- Cloud deployment (AWS / Azure)

## Author
**Nissy Madhurima**  
B.Tech Student  
Passionate about AI, NLP, and Full-Stack Development
