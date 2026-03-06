import { useNavigate } from "react-router-dom"

export default function Services(){

const navigate = useNavigate()

return(

<div className="bg-[#fff7f7] text-black overflow-x-hidden">

{/* HERO */}

<section className="h-screen flex flex-col items-center justify-center text-center px-6">

<h1 className="text-6xl font-bold max-w-4xl leading-tight">
Digital Solutions That Power
<span className="text-[#E10600]"> Modern Businesses</span>
</h1>

<p className="text-black/60 mt-6 max-w-2xl text-lg">
MindSoulix builds scalable platforms, AI automation systems
and powerful digital experiences.
</p>

<button
onClick={()=>navigate("/contact")}
<<<<<<< HEAD
className="mt-10 bg-[#E10600] text-white px-8 py-4 rounded-lg hover:scale-105 transition"
=======
className="mt-10 bg-[#E10600] px-8 py-4 rounded-lg hover:scale-105 transition cursor-pointer"
>>>>>>> origin/test1
>
Get a Quote
</button>

</section>

</div>

)

}
