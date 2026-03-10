import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){

const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleRegister = async () => {

const response = await fetch("http://localhost:8000/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
email,
password
})
});

const data = await response.json();

if(data.message){

alert("Registration successful");
navigate("/login");

}
else{
alert(data.error);
}

};

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f3f4f6"
}}>

<div style={{
background:"white",
padding:"50px",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.15)",
width:"420px"
}}>

<h2>Create Account</h2>

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={{
width:"100%",
padding:"12px",
fontSize:"15px",
borderRadius:"6px",
border:"1px solid #ccc",
marginBottom:"15px"
}}
/>

<br/><br/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"12px",
fontSize:"15px",
borderRadius:"6px",
border:"1px solid #ccc",
marginBottom:"15px"
}}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
fontSize:"15px",
borderRadius:"6px",
border:"1px solid #ccc",
marginBottom:"20px"
}}
/>

<br/><br/>

<button
onClick={handleRegister}
style={{
width:"100%",
padding:"12px",
background:"#16a34a",
color:"white",
border:"none",
borderRadius:"6px",
fontWeight:"bold",
cursor:"pointer"
}}
>
Register
</button>

<p>
Already have account? <a href="/login">Login</a>
</p>

</div>

</div>

)
}