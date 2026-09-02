import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "TDS Properties";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",background:"#0F2547",color:"#F7F5F2",padding:"70px",fontFamily:"serif"}}><div style={{color:"#C9973F",fontSize:24,letterSpacing:8}}>TDS PROPERTIES</div><div style={{fontSize:92,lineHeight:.9,marginTop:25}}>A more considered<br/>way to find your place.</div><div style={{marginTop:42,fontSize:25,color:"#d6d0c5"}}>Ahmedabad · Gandhinagar</div></div>, size); }
