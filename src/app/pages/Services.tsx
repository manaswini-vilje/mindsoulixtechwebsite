import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import {
Database,
Workflow,
Code,
Rocket,
Brain,
Smartphone,
Palette,
Settings,
Cpu,
Zap
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/* SERVICES DATA */

const SERVICES = [
{
id:"web",
title:"Web Development",
desc:"High-performance scalable web platforms.",
steps:[
{
icon:Database,
title:"Requirement Analysis",
desc:"Understanding business needs and defining technical goals."
},
{
icon:Workflow,
title:"Architecture Planning",
desc:"Designing scalable architecture and selecting the right stack."
},
{
icon:Palette,
title:"UI / UX Implementation",
desc:"Creating modern responsive interfaces and experiences."
},
{
icon:Code,
title:"Development",
desc:"Building the platform using optimized code and integrations."
},
{
icon:Rocket,
title:"Deployment",
desc:"Launching the platform and ensuring performance optimization."
}
]
},
{
id:"app",
title:"App Development",
desc:"Modern mobile and cross-platform apps.",
steps:[
{
icon:Smartphone,
title:"Product Strategy",
desc:"Understanding product goals and user requirements."
},
{
icon:Workflow,
title:"Architecture",
desc:"Planning scalable mobile application structure."
},
{
icon:Palette,
title:"Design",
desc:"Creating modern mobile user experiences."
},
{
icon:Code,
title:"Development",
desc:"Building apps with optimized performance."
},
{
icon:Rocket,
title:"Launch",
desc:"Deploying applications to app stores and production."
}
]
},
{
id:"ai",
title:"AI Solutions",
desc:"AI automation and intelligent systems.",
steps:[
{
icon:Brain,
title:"Problem Analysis",
desc:"Identifying opportunities where AI adds business value."
},
{
icon:Database,
title:"Data Engineering",
desc:"Collecting and structuring data for model training."
},
{
icon:Cpu,
title:"Model Development",
desc:"Creating machine learning models for predictions."
},
{
icon:Settings,
title:"System Integration",
desc:"Integrating AI with business workflows and systems."
},
{
icon:Zap,
title:"Continuous Learning",
desc:"Improving models through real-time feedback and data."
}
]
},
{
id:"uiux",
title:"UI / UX Design",
desc:"Beautiful digital experiences.",
steps:[
{
icon:Brain,
title:"User Research",
desc:"Understanding users, behavior and pain points."
},
{
icon:Workflow,
title:"Wireframing",
desc:"Designing the structure and layout of digital products."
},
{
icon:Palette,
title:"Interface Design",
desc:"Crafting beautiful visual interfaces."
},
{
icon:Settings,
title:"Interaction Design",
desc:"Creating engaging user interactions."
},
{
icon:Rocket,
title:"Usability Testing",
desc:"Improving product experience through feedback."
}
]
},
{
id:"automation",
title:"Automation",
desc:"Smart workflow automation systems.",
steps:[
{
icon:Workflow,
title:"Process Analysis",
desc:"Understanding workflows and automation opportunities."
},
{
icon:Database,
title:"System Mapping",
desc:"Mapping existing business tools and integrations."
},
{
icon:Settings,
title:"Automation Design",
desc:"Designing automation architecture."
},
{
icon:Code,
title:"Implementation",
desc:"Building automated workflows and integrations."
},
{
icon:Zap,
title:"Optimization",
desc:"Monitoring and improving automation performance."
}
]
}
]

export default function Services(){

const navigate = useNavigate()

const timelineRef = useRef<HTMLDivElement | null>(null)
const lineRef = useRef<HTMLDivElement | null>(null)
const stepsRef = useRef<(HTMLDivElement | null)[]>([])

const [active,setActive] = useState(0)
const [activeService,setActiveService] = useState(SERVICES[0])

/* AUTO ROTATING CARDS */

useEffect(()=>{

const interval = setInterval(()=>{
setActive(prev => (prev + 1) % SERVICES.length)
},2000)

return ()=>clearInterval(interval)

},[])

/* CLICK SERVICE */

const handleClick = (service:any,index:number)=>{

setActive(index)
setActiveService(service)

setTimeout(()=>{

timelineRef.current?.scrollIntoView({
behavior:"smooth",
block:"start"
})

},300)

}

/* TIMELINE ANIMATION */
useEffect(()=>{

    if(!timelineRef.current) return
    
    const ctx = gsap.context(()=>{
    
    gsap.set(lineRef.current,{height:0})
    
    gsap.timeline({
    scrollTrigger:{
    trigger:timelineRef.current,
    start:"top 70%",
    toggleActions:"play none none none"
    }
    })
    
    .to(lineRef.current,{
    height:"100%",
    duration:1,
    ease:"power2.out"
    })
    
    .fromTo(
    stepsRef.current,
    {
    opacity:0,
    y:40
    },
    {
    opacity:1,
    y:0,
    duration:0.6,
    stagger:0.35
    },
    "-=0.3"
    )
    
    },timelineRef)
    
    return ()=>ctx.revert()
    
    },[activeService])

/* CARD POSITION */

const getPosition = (index:number)=>{

const total = SERVICES.length

if(index===active) return "center"
if(index===(active+1)%total) return "right"
if(index===(active-1+total)%total) return "left"

return "hidden"
}

return(

<div className="bg-[#060606] text-white overflow-x-hidden hover:shadow-[0_0_40px_rgba(255,0,0,0.3)]">

{/* HERO */}

<section className="h-screen flex flex-col items-center justify-center text-center px-6">

<h1 className="text-6xl font-bold max-w-4xl">
Digital Solutions That Power
<span className="text-[#E10600]"> Modern Businesses</span>
</h1>

<p className="text-gray-400 mt-6 max-w-2xl">
MindSoulix builds scalable platforms, AI automation systems
and powerful digital experiences.
</p>

<button
onClick={()=>navigate("/contact")}
className="mt-10 bg-[#E10600] px-8 py-4 rounded-lg hover:scale-105 transition"
>
Get a Quote
</button>

</section>

{/* SERVICES CAROUSEL */}

<section className="min-h-screen flex flex-col items-center justify-center">

<h2 className="text-5xl font-bold mb-20">Our Services</h2>

<div className="relative w-full max-w-6xl h-[420px] flex items-center justify-center">

{SERVICES.map((service,index)=>{

const pos = getPosition(index)

return(

<div
key={service.id}
onClick={()=>handleClick(service,index)}
className={`cursor-pointer absolute transition-all duration-1000
p-10 w-[420px] rounded-2xl border border-white/10
shadow-[0_0_40px_rgba(255,0,0,0.2)]

${
pos==="center"
? "scale-100 opacity-100 z-30"
: pos==="left"
? "-translate-x-[450px] scale-75 opacity-30 blur-sm"
: pos==="right"
? "translate-x-[450px] scale-75 opacity-30 blur-sm"
: "opacity-0"
}`}
style={{background:"rgba(0,0,0,0.75)"}}
>

<h3 className="text-2xl text-[#E10600] mb-4 font-semibold">
{service.title}
</h3>

<p className="text-gray-400">
{service.desc}
</p>

</div>

)

})}

</div>

</section>

{/* HOW WE SOLVE */}

<section
ref={timelineRef}
className="relative py-40"
>

<div className="text-center mb-24">

<h2 className="text-5xl font-bold">
How We Solve
</h2>

<p className="text-[#E10600] text-2xl mt-4">
{activeService.title}
</p>

</div>

<div className="relative max-w-5xl mx-auto">

{/* GRADIENT LINE */}

<div
ref={lineRef}
className="absolute left-1/2 top-0 w-[4px] -translate-x-1/2"
style={{
background:"linear-gradient(180deg,#ff2a2a,#E10600,#6b0000)"
}}
/>

{activeService.steps.map((step:any,index:number)=>{

const left = index % 2 !== 0
const Icon = step.icon

return(

<div
key={index}
className={`relative flex items-center mb-16 ${
left ? "justify-start" : "justify-end"
}`}
>

{/* STEP CARD */}

<div
ref={(el)=>stepsRef.current[index]=el}
className={`w-[420px] p-8 rounded-xl border border-white/10
shadow-[0_0_30px_rgba(255,0,0,0.2)]
${left ? "ml-16" : "mr-16"}
`}
style={{background:"rgba(0,0,0,0.75)"}}
>

<div className="flex items-center gap-4 mb-4">

<div className="w-12 h-12 flex items-center justify-center rounded-lg
bg-[#E10600]/20 text-[#E10600]">

<Icon size={22} />

</div>

<h4 className="text-xl font-semibold">
{step.title}
</h4>

</div>

<p className="text-gray-400">
{step.desc}
</p>

</div>

{/* NUMBER CIRCLE */}

<div
className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full
flex items-center justify-center font-bold text-white"
style={{
    background:"linear-gradient(145deg,#ff2a2a,#E10600)",
boxShadow:"0 0 25px rgba(255,0,0,0.7)"
}}
>
{index+1}
</div>

</div>

)

})}

</div>

</section>

</div>

)

}