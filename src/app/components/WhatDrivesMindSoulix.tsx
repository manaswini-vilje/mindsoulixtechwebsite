import { useState, useEffect, useRef } from "react"

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
description:"Technology should amplify human creativity. MindSoulix systems connect human insight with artificial intelligence."
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

export default function WhatDrivesMindSoulix(){

const sectionRef = useRef<HTMLDivElement>(null)
const canvasRef = useRef<HTMLCanvasElement>(null)

const [activeIndex,setActiveIndex] = useState(0)
const [progress,setProgress] = useState(0)
const [visible,setVisible] = useState(false)

const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
const animationRef = useRef<number | null>(null)


/* SCROLL DETECTION */

useEffect(()=>{

const observer = new IntersectionObserver(
(entries)=>{
if(entries[0].isIntersecting){
setVisible(true)
}
},
{threshold:0.4}
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

if(!visible) return

startTimer()

return ()=>{
if(intervalRef.current) clearInterval(intervalRef.current)
}

},[activeIndex,visible])


/* CANVAS ANIMATION SYSTEM */

useEffect(()=>{

if(!visible) return

const canvas = canvasRef.current
if(!canvas) return

const ctx = canvas.getContext("2d")
if(!ctx) return

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

if(animationRef.current){
cancelAnimationFrame(animationRef.current)
}

let frame = 0

const centerX = canvas.width/2
const centerY = canvas.height/2


/* STEP 1 — AI THINKING */

const drawAI = ()=>{

ctx.clearRect(0,0,canvas.width,canvas.height)

const radius = 20 + frame*0.6

for(let i=0;i<6;i++){

const angle = (Math.PI*2/6)*i

const x = centerX + Math.cos(angle)*radius
const y = centerY + Math.sin(angle)*radius

ctx.beginPath()
ctx.arc(x,y,3,0,Math.PI*2)
ctx.fillStyle="red"
ctx.fill()

ctx.beginPath()
ctx.moveTo(centerX,centerY)
ctx.lineTo(x,y)
ctx.strokeStyle="rgba(255,0,0,0.4)"
ctx.stroke()

}

ctx.beginPath()
ctx.arc(centerX,centerY,4,0,Math.PI*2)
ctx.fillStyle="red"
ctx.fill()

frame+=0.4

}


/* STEP 2 — HUMAN + AI */

const drawHumanAI = ()=>{

ctx.clearRect(0,0,canvas.width,canvas.height)

const r = 10 + frame*0.5

const leftX = centerX - 40
const rightX = centerX + 40

for(let i=0;i<4;i++){

const angle = (Math.PI*2/4)*i

const x1 = leftX + Math.cos(angle)*r
const y1 = centerY + Math.sin(angle)*r

const x2 = rightX + Math.cos(angle)*r
const y2 = centerY + Math.sin(angle)*r

ctx.beginPath()
ctx.arc(x1,y1,3,0,Math.PI*2)
ctx.fillStyle="red"
ctx.fill()

ctx.beginPath()
ctx.arc(x2,y2,3,0,Math.PI*2)
ctx.fillStyle="red"
ctx.fill()

}

ctx.beginPath()
ctx.moveTo(leftX,centerY)
ctx.lineTo(rightX,centerY)
ctx.strokeStyle="rgba(255,0,0,0.6)"
ctx.stroke()

frame+=0.5

}


/* STEP 3 — SCALABLE */

const drawScale = ()=>{

ctx.clearRect(0,0,canvas.width,canvas.height)

const radius = 20 + frame

for(let i=0;i<8;i++){

const angle = (Math.PI*2/8)*i

const x = centerX + Math.cos(angle)*radius
const y = centerY + Math.sin(angle)*radius

ctx.beginPath()
ctx.arc(x,y,3,0,Math.PI*2)
ctx.fillStyle="red"
ctx.fill()

ctx.beginPath()
ctx.moveTo(centerX,centerY)
ctx.lineTo(x,y)
ctx.strokeStyle="rgba(255,0,0,0.4)"
ctx.stroke()

}

ctx.beginPath()
ctx.arc(centerX,centerY,4,0,Math.PI*2)
ctx.fillStyle="red"
ctx.fill()

frame+=0.6

}


/* STEP 4 — CLARITY */

const drawClarity = ()=>{

ctx.clearRect(0,0,canvas.width,canvas.height)

const radius = 30 + frame*0.4

const nodes:any[] = []

for(let i=0;i<6;i++){

const angle = (Math.PI*2/6)*i

nodes.push({
x:centerX + Math.cos(angle)*radius,
y:centerY + Math.sin(angle)*radius
})

}

nodes.forEach(n=>{

ctx.beginPath()
ctx.arc(n.x,n.y,3,0,Math.PI*2)
ctx.fillStyle="red"
ctx.fill()

})

nodes.forEach((a,i)=>{

nodes.slice(i+1).forEach(b=>{

ctx.beginPath()
ctx.moveTo(a.x,a.y)
ctx.lineTo(b.x,b.y)
ctx.strokeStyle="rgba(255,0,0,0.25)"
ctx.stroke()

})

})

if(frame>80){

ctx.beginPath()
ctx.moveTo(nodes[0].x,nodes[0].y)
ctx.lineTo(nodes[3].x,nodes[3].y)
ctx.strokeStyle="rgba(255,0,0,0.8)"
ctx.lineWidth=2
ctx.stroke()

}

frame+=0.4

}


/* MAIN LOOP */

const animate = ()=>{

switch(activeIndex){

case 0: drawAI(); break
case 1: drawHumanAI(); break
case 2: drawScale(); break
case 3: drawClarity(); break

}

animationRef.current = requestAnimationFrame(animate)

}

animate()

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
What Drives <span className="text-[#E10600]">MindSoulix Tech</span>
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

{isActive && (

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
<canvas ref={canvasRef} className="w-[220px] h-[180px]" />
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