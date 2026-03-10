import { useState } from "react";
import SkillChart from "../components/SkillChart";

export default function JobSeekerDashboard(){
  const userName = localStorage.getItem("username") || "User";

const [resume,setResume] = useState("");
const [jd,setJD] = useState("");

const [resumeFileText,setResumeFileText] = useState(""); 
const [jdFileText,setJDFileText] = useState("");

const [suggestions,setSuggestions] = useState([]);

const [resumeSummary,setResumeSummary] = useState({});
const [jdSummary,setJDSummary] = useState({});

const [matchedSkills,setMatchedSkills] = useState([]);
const [missingSkills,setMissingSkills] = useState([]);

const [score,setScore] = useState(null);

const handleLogout = () => {
  localStorage.removeItem("username");
  window.location.href = "/login";
};


const handleFileUpload = async (event) => {

const file = event.target.files[0];
if(!file) return;

const formData = new FormData();
formData.append("file", file);

const response = await fetch("http://localhost:8000/upload-resume",{
method:"POST",
body:formData
});

const data = await response.json();
setResumeFileText(data.text);

};


const handleJDFileUpload = async (event) => {

const file = event.target.files[0];
if(!file) return;

const formData = new FormData();
formData.append("file", file);

const response = await fetch("http://localhost:8000/upload-jd",{
method:"POST",
body:formData
});

const data = await response.json();
setJDFileText(data.text);

};


const skillDatabase = [

"python","java","c","c++","javascript","typescript",

"html","css","react","angular","vue","nodejs","express",

"sql","mysql","postgresql","mongodb","oracle","firebase",

"data structures","algorithms","object oriented programming",

"machine learning","deep learning","nlp","computer vision",

"pandas","numpy","scikit-learn","tensorflow","pytorch",

"docker","kubernetes","aws","azure","gcp",

"github","git","linux","bash","shell scripting",

"power bi","tableau","excel",

"spring boot","django","flask",

"rest api","microservices",

"cybersecurity","network security",

"data analysis","data science"

];


const preprocess = (text) => {

if(!text) return "";

let clean = text.toLowerCase();
clean = clean.replace(/[^\w\s]/g," ");
clean = clean.replace(/\s+/g," ");

return clean.trim();

};

const extractBasicInfo = (text) => {

const lines = text.split("\n");

let name = "Not Found";

const nameMatch = text.match(/name[:\s]+([a-zA-Z\s]+)/i);

if(nameMatch){
name = nameMatch[1].trim();
}
else{
name = lines[0]?.trim();
}

const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

const phoneMatch = text.match(/(\+?\d{1,3})?[\s-]?\d{10}/);

return {

name: name,

email: emailMatch ? emailMatch[0] : "Not Found",

phone: phoneMatch ? phoneMatch[0] : "Not Found"

};

};


const extractSkills = (text) => {

const cleanText = preprocess(text);

const skills = [];

skillDatabase.forEach(skill => {

if(cleanText.includes(skill) && !skills.includes(skill)){
skills.push(skill);
}

});

return skills;

};

const extractAchievements = (text) => {

const keywords = [
"hackathon",
"rank",
"finalist",
"winner",
"award",
"certification",
"achievement",
"contest"
];

const sentences = text.split(/\n|\./);

const achievements = sentences.filter(sentence =>
keywords.some(word => sentence.toLowerCase().includes(word))
);

return achievements.slice(0,3);

};


const analyzeMatch = async () => {

const finalResume = resume || resumeFileText;
const finalJD = jd || jdFileText;

if(!finalResume || !finalJD){
alert("Please upload or paste both Resume and Job Description");
return;
}

  try{

    const response = await fetch("http://127.0.0.1:8000/analyze",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        resume_text:finalResume,
        jd_text:finalJD
      })
    });

    const data = await response.json();

    setSuggestions(data.suggestions || []);
    setMatchedSkills(data.matched_skills || []);
    setMissingSkills(data.missing_skills || []);
    setScore(data.match_score || 0);

    // Resume summary
    const basicInfo = extractBasicInfo(finalResume);
    const achievements = extractAchievements(finalResume);

    setResumeSummary({
      basicInfo,
      skills: data.resume_skills,
      achievements
    });

    // JD summary
    const roleMatch = finalJD.match(/(software|backend|frontend|full stack|data|ml).*?(engineer|developer|intern)/i);

    const role = roleMatch ? roleMatch[0] : "Not Specified";

    const description = finalJD
      .split(".")
      .slice(0,2)
      .join(".")
      .trim();

    setJDSummary({
      role,
      description,
      skills: data.jd_skills
    });

  }catch(error){
    console.error("Error analyzing:",error);
  }

};

 

const skillResources = {

python:"https://youtu.be/_uQrJ0TkZlc",
java:"https://youtu.be/grEKMHGYyns",
c:"https://youtu.be/KJgsSFOSQv0",
"c++":"https://youtu.be/vLnPwxZdW4Y",

javascript:"https://youtu.be/W6NZfCO5SIk",
typescript:"https://youtu.be/BwuLxPH8IDs",

html:"https://youtu.be/UB1O30fR-EE",
css:"https://youtu.be/yfoY53QXEnI",

react:"https://youtu.be/bMknfKXIFA8",
nodejs:"https://youtu.be/TlB_eWDSMt4",
express:"https://youtu.be/L72fhGm1tfE",

sql:"https://youtu.be/HXV3zeQKqGY",
mysql:"https://youtu.be/7S_tz1z_5bA",
mongodb:"https://youtu.be/ExcRbA7fy_A",

"data structures":"https://youtu.be/RBSGKlAvoiM",
algorithms:"https://youtu.be/8hly31xKli0",

"object oriented programming":"https://youtu.be/pTB0EiLXUC8",

docker:"https://youtu.be/pTFZFxd4hOI",
kubernetes:"https://youtu.be/X48VuDVv0do",

aws:"https://youtu.be/3hLmDS179YE",

git:"https://youtu.be/RGOj5yH7evk",
github:"https://youtu.be/w3jLJU7DT5E",

nlp:"https://youtu.be/X2vAabgKiuM",
"machine learning":"https://youtu.be/GwIo3gDZCVQ",

"data science":"https://youtu.be/X3paOmcrTjQ",
"data analysis":"https://youtu.be/r-uOLxNrNk8"

};

return(

<div style={{padding:"40px", fontFamily:"Arial"}}>

<div
style={{
width:"100%",
background:"#1f2937",
color:"white",
padding:"12px 30px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px"
}}
>

<p
style={{
margin:0,
fontSize:"18px",
fontWeight:"600"
}}
>
Welcome {userName}!! to Skill Resume Matcher
</p>

<button
onClick={handleLogout}
style={{
background:"#ef4444",
border:"none",
color:"white",
padding:"7px 16px",
borderRadius:"5px",
cursor:"pointer",
fontWeight:"bold"
}}
>
Logout
</button>

</div>

<h2 style={{color:"#2c3e50"}}>Skill-Matcher Dashboard</h2>


<div style={{display:"flex", gap:"40px"}}>

<div>

<h3>Upload Resume (PDF / DOCX)</h3>

<input
type="file"
accept=".pdf,.docx"
onChange={(e)=>handleFileUpload(e)}
/>

<h3>Paste Resume</h3>

<textarea
rows="8"
cols="50"
value={resume}
onChange={(e)=>setResume(e.target.value)}
/>

</div>


<div>

<h3>Upload Job Description (PDF / DOCX)</h3>

<input
type="file"
accept=".pdf,.docx"
onChange={handleJDFileUpload}
/>

<h3>Paste Job Description</h3>

<textarea
rows="8"
cols="50"
value={jd}
onChange={(e)=>setJD(e.target.value)}
/>

</div>

</div>


<br/>

<button
onClick={analyzeMatch}
style={{
padding:"10px 20px",
background:"#3498db",
color:"white",
border:"none",
cursor:"pointer"
}}
>
Analyze Match
</button>


{score !== null && (

<div style={{marginTop:"40px"}}>

<h2>Match Score: {score}%</h2>

<div style={{display:"flex", gap:"60px"}}>

<SkillChart score={score} />

<div>

<h3>Matched Skills</h3>

{matchedSkills.map((skill,i)=>(

<span
key={i}
style={{
background:"#2ecc71",
color:"white",
padding:"6px 12px",
margin:"5px",
display:"inline-block",
borderRadius:"5px"
}}
>
{skill}
</span>

))}


<h3 style={{marginTop:"20px"}}>Missing Skills</h3>

{missingSkills.map((skill,i)=>(

<span
key={i}
style={{
background:"#e74c3c",
color:"white",
padding:"6px 12px",
margin:"5px",
display:"inline-block",
borderRadius:"5px"
}}
>
{skill}
</span>

))}

</div>

</div>

<div style={{display:"flex", gap:"40px", marginTop:"30px"}}>


{/* Resume Summary */}

<div style={{
flex:1,
background:"#f4f6f7",
padding:"20px",
borderRadius:"10px"
}}>

<h2>Processed Resume</h2>

<h4>Basic Info</h4>
<p>Name: {resumeSummary.basicInfo?.name}</p>
<p>Email: {resumeSummary.basicInfo?.email}</p>
<p>Phone: {resumeSummary.basicInfo?.phone}</p>

<h4>Skills</h4>

<div>
{resumeSummary.skills?.map((skill,i)=>(
<span
key={i}
style={{
background:"#2ecc71",
color:"white",
padding:"6px 12px",
margin:"5px",
display:"inline-block",
borderRadius:"20px"
}}
>
{skill}
</span>
))}
</div>

<h4>Achievements</h4>

<ul>
{resumeSummary.achievements?.map((item,i)=>(
<li key={i}>{item.replace(/•/g,"").trim()}</li>
))}
</ul>

</div>


{/* Job Description Summary */}

<div style={{
flex:1,
background:"#f4f6f7",
padding:"20px",
borderRadius:"10px"
}}>

<h2>Processed Job Description </h2>

<h4>Role</h4>
<p>{jdSummary.role}</p>

<h4>Description</h4>
<p>{jdSummary.description}</p>

<h4>Skills Required</h4>

<div>
{jdSummary.skills?.map((skill,i)=>(
<span
key={i}
style={{
background:"#3498db",
color:"white",
padding:"6px 12px",
margin:"5px",
display:"inline-block",
borderRadius:"20px"
}}
>
{skill}
</span>
))}
</div>

</div>
</div>

<h3 style={{marginTop:"30px"}}>Skill Improvement Suggestions</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",
gap:"15px",
marginTop:"15px"
}}
>

{missingSkills.map((skill,i)=>(

<div
key={i}
style={{
background:"#ffffff",
borderRadius:"10px",
padding:"15px",
boxShadow:"0 2px 6px rgba(0,0,0,0.1)",
display:"flex",
flexDirection:"column",
justifyContent:"space-between"
}}
>

<div style={{marginBottom:"10px"}}>

<span
style={{
background:"#e74c3c",
color:"white",
padding:"6px 12px",
borderRadius:"20px",
fontWeight:"bold",
fontSize:"14px"
}}
>
Missing Skill: {skill}
</span>

</div>

<p
style={{
fontSize:"14px",
color:"#555",
marginBottom:"10px"
}}
>
Improve your knowledge in <b>{skill}</b> to increase your match score.
</p>

{skillResources[skill.toLowerCase()] && (

<a
href={skillResources[skill.toLowerCase()]}
target="_blank"
rel="noopener noreferrer"
>

<button
style={{
width:"100%",
padding:"8px",
background:"#3498db",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
}}
>
🎥 Watch Tutorial
</button>

</a>

)}

</div>

))}

</div>


{/* Recommended Skills Section */}

{suggestions.length > 0 && (

<div style={{marginTop:"30px"}}>

<h3>Recommended Skills to Learn</h3>

<div
style={{
display:"flex",
flexWrap:"wrap",
gap:"10px",
marginTop:"10px"
}}
>

{suggestions.map((skill,i)=>(

<span
key={i}
style={{
background:"#9b59b6",
color:"white",
padding:"8px 14px",
borderRadius:"20px",
fontWeight:"bold"
}}
>
{skill}

</span>

))}

</div>

</div>

)}
</div>


)}

</div>

)

}