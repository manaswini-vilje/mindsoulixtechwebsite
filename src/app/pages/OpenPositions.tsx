import { ArrowLeft, Briefcase } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function OpenPositions() {
  const navigate = useNavigate()

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-[#F8F8F8] p-10">
      <button
        type="button"
        onClick={() => navigate("/careers")}
        className="absolute top-[100px] left-[40px] z-20 flex items-center gap-2 font-medium text-[#2F2F2F] transition-colors hover:text-[#E10600]"
      >
        <ArrowLeft size={20} />
        <span>Back to Careers</span>
      </button>

      <div className="w-full max-w-[600px] rounded-[16px] bg-white p-[50px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <Briefcase className="mx-auto mb-4 text-[#E10600]" size={48} />

        <h1 className="mb-4 text-[32px] font-bold text-[#2F2F2F]">Freelance Opportunities</h1>

        <p className="text-[16px] leading-[1.7] text-[#555]">
          Thank you for your interest in collaborating with MindSoulix Tech.
          <br />
          <br />
          At the moment, we do not have any open freelance opportunities available. However,
          we are always excited to connect with talented professionals and may open new
          opportunities in the future.
          <br />
          <br />
          To stay informed about upcoming roles, updates, and collaboration opportunities, we
          encourage you to follow us on LinkedIn.
        </p>

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-[30px] inline-flex rounded-[999px] bg-[#E10600] px-[26px] py-[14px] font-semibold text-white transition-colors hover:bg-[#c40500]"
        >
          Follow us on LinkedIn
        </a>
      </div>
    </section>
  )
}
