import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useRef } from "react"

export default function Contact() {

const location = useLocation()

useEffect(() => {
  if (location.hash) {
    const el = document.querySelector(location.hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }
}, [location])

const navigate = useNavigate()

const contactRef = useRef<HTMLDivElement | null>(null)

const tags = [
"Logo & Branding",
"Mobile App Design",
"3D Design",
"Web Design & Development",
"Graphic Design"
]

const images = [
"https://images.unsplash.com/photo-1558655146-d09347e92766",
"https://images.unsplash.com/photo-1559027615-cd4628902d4a",
"https://images.unsplash.com/photo-1559028006-448665bd7c7f",
"https://images.unsplash.com/photo-1519389950473-47ba0277781c",
"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
"https://images.unsplash.com/photo-1558655146-9f40138edfeb",
"https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2",
"https://images.unsplash.com/photo-1559027615-cd4628902d4a",
"https://images.unsplash.com/photo-1519389950473-47ba0277781c"
]

return (

<div className="bg-[#fff7f7] text-black">

<style>
{`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

.contact-font{
font-family:'Plus Jakarta Sans',sans-serif;
}
`}
</style>


{/* HERO SECTION */}

<section id="hero" className="min-h-screen flex items-center px-10">

<div className="contact-font max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center w-full">


{/* LEFT */}

<div className="relative">

<div className="absolute w-[600px] h-[600px] rounded-full
bg-gradient-to-br from-[#E10600]/15 to-transparent blur-[140px]
-left-40 top-10"/>

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-[80px] leading-[0.95] font-semibold tracking-tight"
>
Let’s Talk<span className="text-[#E10600]">.</span>
</motion.h1>

<motion.p
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="mt-6 text-black/60 text-lg max-w-xl"
>
Share your vision and craft your
<span className="text-black font-medium"> NEXT MASTERPIECE </span>
with MindSoulix Tech.
</motion.p>


{/* SCROLLING SERVICES BAR */}

<div className="mt-12 relative overflow-hidden">

<motion.div
className="flex gap-6 w-max"
animate={{ x: ["0%", "-50%"] }}
transition={{
repeat: Infinity,
duration: 15,
ease: "linear"
}}
>

{[...tags, ...tags].map((tag,i)=>(

<div
key={i}
className="px-6 py-3 whitespace-nowrap rounded-lg border border-black/10
bg-white text-sm hover:border-[#E10600]/40 transition"
>
{tag}
</div>

))}

</motion.div>

</div>


</div>


{/* RIGHT IMAGE GRID */}

<div className="relative h-[620px] overflow-hidden">

<div className="flex gap-6 ml-20 mb-6">
<img src={images[0]} className="w-[160px] h-[180px] rounded-xl object-cover"/>
<img src={images[1]} className="w-[160px] h-[180px] rounded-xl object-cover"/>
</div>

<div className="flex gap-6 mb-6">
<img src={images[2]} className="w-[160px] h-[180px] rounded-xl object-cover"/>
<img src={images[3]} className="w-[160px] h-[180px] rounded-xl object-cover"/>
<img src={images[4]} className="w-[160px] h-[180px] rounded-xl object-cover"/>
</div>

<div className="flex gap-6 ml-20 mb-6">
<img src={images[5]} className="w-[160px] h-[180px] rounded-xl object-cover"/>
<img src={images[6]} className="w-[160px] h-[180px] rounded-xl object-cover"/>
</div>

</div>

</div>

</section>


{/* FORM SECTION */}

<section
id="form"
ref={contactRef}
className="w-full py-28 px-10 scroll-mt-32"
>

<div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-start">


{/* LEFT TEXT */}

<div>

<h2 className="text-5xl font-semibold leading-tight">

Let’s Talk About Smarter  

<span className="italic text-black/60">
 Digital Solutions with MindSoulix
</span>

</h2>

<p className="text-black/60 mt-6 text-lg max-w-md">

Whether you need AI automation, scalable platforms,
or modern applications, our team is ready to help
transform your ideas into powerful digital products.

</p>

</div>


{/* FORM */}

<div className="rounded-2xl border border-black/10 bg-white p-10 shadow-lg">

<form className="flex flex-col gap-6">

<div>

<label className="text-sm text-black/60">Full Name</label>

<div className="grid grid-cols-2 gap-4 mt-2">

<input
type="text"
placeholder="First name"
className="bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
/>

<input
type="text"
placeholder="Last name"
className="bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
/>

</div>

</div>


<div>

<label className="text-sm text-black/60">Email Address</label>

<input
type="email"
placeholder="Email Address"
className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
/>

</div>


<div>

<label className="text-sm text-black/60">Phone Number</label>

<input
type="tel"
placeholder="+91 Phone Number"
className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
/>

</div>


<div>

<label className="text-sm text-black/60">Topic</label>

<select className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none">

<option>General Inquiry</option>
<option>Web Development</option>
<option>App Development</option>
<option>AI Solutions</option>
<option>Automation</option>

</select>

</div>


<div>

<label className="text-sm text-black/60">Message</label>

<textarea
rows={5}
placeholder="Your Message"
className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
/>

</div>


<label className="flex items-center gap-2 text-sm text-black/60">

<input type="checkbox" className="accent-[#E10600]" />

I agree to be contacted regarding this inquiry.

</label>


<button
type="submit"
className="bg-[#E10600] hover:bg-red-700 text-white transition px-6 py-3 rounded-lg w-fit font-medium"
>
Send Message
</button>

</form>

</div>

</div>

</section>

</div>

)
}