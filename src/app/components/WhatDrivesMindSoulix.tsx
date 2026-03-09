import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const STEP_DURATION = 5000

const VALUES = [
{
id:0,
title:"AI-First Thinking",
description:"We design systems where artificial intelligence forms the foundation of every platform, enabling continuous learning and evolution."
},
{
id:1,
title:"Human-Centered Intelligence",
description:"Technology should amplify human creativity. MindSoulix Tech systems connect human insight with artificial intelligence."
},
{
id:2,
title:"Scalable Intelligence Systems",
description:"Our architectures grow with your organization, expanding seamlessly while maintaining performance and adaptability."
},
{
id:3,
title:"Clarity Through Design",
description:"We simplify complexity. Intelligent systems should remain understandable, clean, and powerful."
}
]

const CODE_LINES = [
"<AI_SYSTEM>",
"initialize()",
"train()",
"optimize()",
"deploy()",
"</AI_SYSTEM>"
]

export default function WhatDrivesMindSoulix (){

const sectionRef = useRef<HTMLDivElement>(null)

const [activeIndex,setActiveIndex] = useState(0)
const [progress,setProgress] = useState(0)
const [visible,setVisible] = useState(false)

const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)


/* SCROLL DETECTION */

useEffect(()=>{

const observer = new IntersectionObserver(
(entries)=>{
setVisible(entries[0].isIntersecting)
},
{threshold:0.6}
)

if(sectionRef.current){
observer.observe(sectionRef.current)
}

return ()=>observer.disconnect()

},[])


/* TIMER */

const startTimer = ()=>{

const start = Date.now()

intervalRef.current = setInterval(()=>{

const elapsed = Date.now() - start
const percent = Math.min((elapsed / STEP_DURATION) * 100,100)

setProgress(percent)

if(percent >= 100){

clearInterval(intervalRef.current!)

setActiveIndex(prev => (prev + 1) % VALUES.length)
setProgress(0)

}

},50)

}

useEffect(()=>{

 if(!visible){
 if(intervalRef.current) clearInterval(intervalRef.current)
 return
 }

 startTimer()

 return ()=>{
 if(intervalRef.current) clearInterval(intervalRef.current)
 }

},[activeIndex,visible])


return(

<section
ref={sectionRef}
className="relative w-full bg-white py-32 overflow-hidden"
>

<div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-red-600/10 blur-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"/>

<div className="max-w-[1400px] mx-auto px-6 relative">

<div className={`mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}>

<h2 className="text-black text-4xl md:text-5xl font-semibold">
What Drives MindSoulix Tech
</h2>

<p className="text-gray-600 mt-6 max-w-xl">
Our principles guide how we design intelligent systems and build technology that evolves with people.
</p>

</div>

<div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

{VALUES.map((item,index)=>{

const isActive = index === activeIndex

return(

<div key={item.id} className="flex flex-col">

<div className="relative h-[2px] bg-black/10">

{isActive && visible && (

<div
className="absolute left-0 top-0 h-[2px] bg-[#E10600]"
style={{width:`${progress}%`}}
/>

)}

</div>

<div
className="mt-5 cursor-pointer"
onClick={()=>{

if(intervalRef.current) clearInterval(intervalRef.current)

setActiveIndex(index)
setProgress(0)

}}
>

<p className={`text-[18px] ${isActive ? "text-black":"text-gray-500"}`}>
{item.title}
</p>

</div>

<div className="mt-16 min-h-[260px]">

{isActive && (

<div className="animate-fade">

<div className="h-[180px] mb-10">
<motion.div
key={`code-${activeIndex}`}
className="w-[220px] h-[180px] rounded-xl border border-black/10 bg-[#fff7f7] p-4 font-mono text-[13px] leading-[1.5] overflow-hidden"
animate={{y:[0,-6,0]}}
transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
>
{CODE_LINES.map((line,lineIndex)=>{

const isDeployLine = line === "deploy()"

return(
<motion.div
key={`${line}-${lineIndex}`}
initial={{opacity:0,x:-20}}
animate={{opacity:1,x:0}}
transition={{delay:lineIndex * 0.4,duration:0.5}}
className={isDeployLine ? "text-[#E10600]" : "text-black"}
>
{line}
{isDeployLine && (
<motion.span
animate={{opacity:[0,1,0]}}
transition={{duration:1,repeat:Infinity,ease:"linear"}}
className="ml-1 text-[#E10600]"
>
|
</motion.span>
)}
</motion.div>
)

})}
</motion.div>
</div>

<p className="text-gray-600 leading-relaxed max-w-[420px]">
{item.description}
</p>

</div>

)}

</div>

</div>

)

})}

</div>

</div>

<style>{`

.animate-fade{
animation:fade .6s ease;
}

@keyframes fade{
from{
opacity:0;
transform:translateY(20px);
}
to{
opacity:1;
transform:translateY(0);
}
}

`}</style>

</section>

)

}
