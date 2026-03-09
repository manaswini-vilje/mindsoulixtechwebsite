import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutCTA() {

 useRef<HTMLCanvasElement>(null);
 const navigate = useNavigate();

return(

<section className="relative w-full bg-[#fff7f7] py-40 overflow-hidden flex justify-center items-center">

{/* subtle glow */}

<div className="absolute w-[700px] h-[700px] rounded-full
bg-[radial-gradient(circle,rgba(255,0,0,0.15),transparent_65%)]
blur-[120px]"
/>

{/* content */}

<div className="relative z-10 text-center max-w-[720px] px-6">

<h2 className="text-black text-5xl font-semibold leading-tight mb-6">

Ready to Build the Future <br/>

with <span className="text-black">MindSoulix Tech</span>?

</h2>

<p className="text-[#4B5563] text-lg mb-10">

We partner with ambitious teams to design AI-driven platforms
that evolve with your business and unlock new possibilities.

</p>


<button
className="px-10 py-4 rounded-lg text-white text-lg font-medium
bg-[#E10600]
transition-all duration-300
cursor-pointer
hover:scale-105
hover:shadow-[0_0_40px_rgba(255,0,0,0.7)]"
onClick={() => navigate("/contact#form")}>

Schedule a Call

</button>

</div>

</section>

)

}
