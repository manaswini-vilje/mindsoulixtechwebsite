import { useEffect, useRef, useState } from "react"

const paragraph1 = `MindSoulix began with a simple question:

What if artificial intelligence could work
alongside human creativity instead of
replacing it?

We set out to design systems where
technology amplifies human intelligence.`

const paragraph2 = `Today, MindSoulix builds intelligent platforms
that adapt, learn, and evolve with the people
who use them.

Our goal is not just software.

We design living systems that grow
with organizations and unlock
new possibilities.`

export default function AboutStoryCards() {

const sectionRef = useRef<HTMLDivElement>(null)

const [visible,setVisible] = useState(false)
const [step,setStep] = useState(0)

/*
Steps
0 hidden
1 card1 center
2 card1 fade
3 card2 center
4 card2 fade
5 final layout
*/

const delay = (ms:number)=> new Promise(res=>setTimeout(res,ms))

const runAnimation = async ()=>{

setStep(1)
await delay(2000)

setStep(2)
await delay(700)

setStep(3)
await delay(2000)

setStep(4)
await delay(700)

setStep(5)

}

useEffect(()=>{

const observer = new IntersectionObserver(

(entries)=>{

if(entries[0].isIntersecting){

setVisible(true)
runAnimation()

}else{

setVisible(false)
setStep(0)

}

},

{threshold:0.5}

)

if(sectionRef.current){
observer.observe(sectionRef.current)
}

return ()=>observer.disconnect()

},[])



const card1Position = ()=>{

if(step === 1) return "left-1/2 -translate-x-1/2 opacity-100"
if(step === 2) return "left-1/2 -translate-x-1/2 opacity-0"
if(step === 5) return "left-0 opacity-100"

return "-left-[520px] opacity-0"

}



const card2Position = ()=>{

if(step === 3) return "right-1/2 translate-x-1/2 opacity-100"
if(step === 4) return "right-1/2 translate-x-1/2 opacity-0"
if(step === 5) return "right-0 opacity-100"

return "-right-[520px] opacity-0"

}



return(

<section
ref={sectionRef}
className="relative w-full bg-[#fff7f7] py-40 overflow-hidden"
>

<div className="max-w-[1200px] mx-auto px-6">

{/* HEADING */}

<h2
className={`text-center text-black text-4xl md:text-5xl font-semibold mb-28 transition-all duration-1000 ${
visible ? "opacity-100 translate-y-0":"opacity-0 translate-y-12"
}`}
>

The Story Behind <span className="text-[#E10600]">MindSoulix Tech</span>

</h2>



{/* CARD AREA */}

<div className="relative min-h-[320px] flex items-center justify-center">

{/* CARD 1 */}

<div
className={`storyCard absolute ${card1Position()}`}
>

{paragraph1}

</div>



{/* CARD 2 */}

<div
className={`storyCard absolute ${card2Position()}`}
>

{paragraph2}

</div>

</div>

</div>



<style>{`

.storyCard{

width:420px;
height:260px;

padding:28px;

display:flex;
align-items:center;

border-radius:16px;

border:1px solid rgba(255,0,0,0.35);

background:rgba(255,255,255,0.6);

backdrop-filter:blur(10px);

color:black;

line-height:1.6;

transition:all 0.9s ease;

box-shadow:
0 0 40px rgba(255,0,0,0.25),
inset 0 0 40px rgba(255,0,0,0.15);

text-shadow:0 0 6px rgba(255,0,0,0.25);

position:absolute;

}



.storyCard:hover{

box-shadow:
0 0 70px rgba(255,0,0,0.5),
inset 0 0 60px rgba(255,0,0,0.25);

transform:translateY(-6px);

}

`}</style>

</section>

)

}