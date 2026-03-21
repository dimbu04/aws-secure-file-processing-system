import React, { useState } from "react";

function App() {

const [email,setEmail] = useState("");
const [file,setFile] = useState(null);
const [preview,setPreview] = useState("");
const [progress,setProgress] = useState(0);
const [logs,setLogs] = useState([]);
const [done,setDone] = useState(false);
const [fileUrl,setFileUrl] = useState("");

const addLog = (msg)=>{
 setLogs(prev => [...prev,msg]);
}

const uploadFile = async () => {

 if(!file) return alert("Select file");

 try{

 setDone(false);
 setLogs([]);
 setProgress(10);

 addLog("🌐 Connecting to Backend...");

 const res = await fetch(
 "http://file-upload-alb-1789282380.us-east-1.elb.amazonaws.com/generate-url?key="
 + file.name +
 "&email=" + email
 );

 const data = await res.json();

 console.log("BACKEND RESPONSE:",data);

 setProgress(30);
 addLog("⚡ Presigned URL received");

 const uploadRes = await fetch(data.uploadURL,{
   method:"PUT",
   headers:{
     "Content-Type": file.type
   },
   body:file
 });

 console.log("UPLOAD STATUS:",uploadRes.status);

 if(!uploadRes.ok){
   alert("S3 Upload Failed");
   return;
 }

 setProgress(70);
 addLog("☁️ File uploaded to S3");

 setFileUrl(data.fileUrl);

 addLog("🌍 CDN link generated");

 await new Promise(r=>setTimeout(r,1500));

 setTimeout(()=>{
   setProgress(100);
   addLog("✅ Processing complete");
   setDone(true);
 },1000);

 }catch(err){
   alert("Upload Failed");
   console.log(err);
 }

}

return (

<div style={bgStyle}>
<div style={card}>

<h1>🚀 Cloud File Upload</h1>

<input
 placeholder="Enter Email"
 style={input}
 onChange={(e)=>setEmail(e.target.value)}
/>

<input
 type="file"
 style={input}
 onChange={(e)=>{
   const f = e.target.files[0];
   setFile(f);
   setPreview(URL.createObjectURL(f));
 }}
/>

{/* ⭐ IMAGE PREVIEW BOX */}
{preview &&
<div style={previewBox}>
   <img src={preview} style={previewImg}/>
</div>
}

<button style={btn} onClick={uploadFile}>
 Start Upload
</button>

<div style={progressBar}>
<div style={{...progressFill,width:progress+"%"}}></div>
</div>

<div style={logBox}>
 {logs.map((l,i)=><p key={i}>{l}</p>)}
</div>

{done &&
<div style={success}>
 🎉 Upload Completed Successfully <br/><br/>

 {fileUrl &&
 <a href={fileUrl} target="_blank" rel="noreferrer">
 <button style={openBtn}>🌍 Open Your File</button>
 </a>
 }
</div>
}

</div>
</div>

);

}

const bgStyle={
background:"linear-gradient(135deg,#020617,#0f172a)",
minHeight:"100vh",
paddingTop:80
}

const card={
width:520,
margin:"auto",
background:"#020617",
padding:40,
borderRadius:20,
boxShadow:"0 0 60px #0ea5e9",
color:"white"
}

const input={
width:"100%",
padding:12,
marginTop:20,
background:"#020617",
border:"1px solid #334155",
color:"white",
borderRadius:10
}

const previewBox={
marginTop:20,
background:"#020617",
border:"1px solid #334155",
borderRadius:12,
padding:10,
textAlign:"center"
}

const previewImg={
maxWidth:"100%",
height:180,
objectFit:"contain",
borderRadius:10
}

const btn={
width:"100%",
padding:14,
marginTop:25,
background:"linear-gradient(90deg,#06b6d4,#6366f1)",
border:"none",
borderRadius:12,
color:"white",
fontSize:16,
cursor:"pointer"
}

const progressBar={
width:"100%",
height:12,
background:"#1e293b",
borderRadius:20,
marginTop:25
}

const progressFill={
height:12,
background:"linear-gradient(90deg,#22c55e,#06b6d4)",
borderRadius:20
}

const logBox={
marginTop:20,
background:"#020617",
border:"1px solid #334155",
padding:15,
height:120,
overflow:"auto",
borderRadius:12
}

const success={
marginTop:20,
padding:15,
background:"#16a34a",
textAlign:"center",
borderRadius:12
}

const openBtn={
padding:12,
borderRadius:10,
border:"none",
background:"#0ea5e9",
color:"white",
cursor:"pointer"
}

export default App;