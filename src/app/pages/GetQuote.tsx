import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser";

type QuoteConfirmPageProps = {
  email: string;
  onReturn: () => void;
};

function QuoteConfirmPage({ email, onReturn }: QuoteConfirmPageProps) {
  return (
    <main className="min-h-screen bg-[#fff7f7] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-10 shadow-xl">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E10600]/10 text-[#E10600]">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.4]">
            <path d="M20 7L10 17l-6-6" />
          </svg>
        </div>

        <h1 className="mt-6 text-4xl font-semibold leading-tight text-black">Your quote request was submitted.</h1>

        <p className="mt-4 text-lg text-black/70">
          Thank you for reaching out. Our professional team will contact you within 24 hours.
        </p>

        <div className="mt-7 rounded-2xl border border-[#E10600]/20 bg-[#E10600]/5 p-5">
          <p className="text-sm font-medium uppercase tracking-wide text-[#E10600]">Email Notification</p>
          <p className="mt-2 text-black/80">Please check your email: {email || "your registered email address"}.</p>
          <p className="mt-1 text-black/70">We have sent a confirmation notification through our EmailJS workflow.</p>
        </div>

        <button
          type="button"
          onClick={onReturn}
          className="mt-8 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-black/85 cursor-pointer"
        >
          Return to Get Quote
        </button>
      </div>
    </main>
  );
}

export default function GetQuote() {
  const [showConfirmPage, setShowConfirmPage] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) {
      return;
    }
    const formElement = form.current;
    const formData = new FormData(formElement);

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_4otxmn7",
        "template_xwy58or",
        formElement,
        "lHBRl4MN0KpqopTMV"
      );

      const typedForm = formElement as HTMLFormElement & {
        from_name: HTMLInputElement;
        to_email: HTMLInputElement;
        project_type: HTMLInputElement;
        budget_range: HTMLInputElement;
        timeline: HTMLInputElement;
        message: HTMLTextAreaElement;
      };

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbxRXEiFVjSwUSs4KtAiM23-Epn2rt1Ki7Md4CA0yEULi1mAc9ZAgS5yrzfLsYp0q5E3/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
              name: typedForm.from_name.value,
              email: typedForm.to_email.value,
              project: typedForm.project_type.value,
              budget: typedForm.budget_range.value,
              timeline: typedForm.timeline.value,
              message: typedForm.message.value,
            }),
          }
        );
      } catch (sheetError) {
        console.warn("Google Sheet sync failed:", sheetError);
      }

      setSubmittedEmail((formData.get("to_email") as string) || "");
      formElement.reset();
      setShowConfirmPage(true);
    } catch (error) {
      console.log("FAILED...", error);
      setSubmitError("Unable to submit your quote request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const steps = [
    "Project Type",
    "Budget Range",
    "Timeline",
    "Contact Details"
  ]

  const sectionRef = useRef<HTMLDivElement>(null)

  const [startAnimation, setStartAnimation] = useState(false)
  const [progress, setProgress] = useState(0)

  /* detect when section appears */

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true)
        }
      },
      { threshold: 0.6 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()

  }, [])


  /* animate progress */

  useEffect(() => {

    if (!startAnimation) return

    const interval = setInterval(() => {

      setProgress((prev) => {

        if (prev >= 100) return prev
        return prev + 25

      })

    }, 2000)

    return () => clearInterval(interval)

  }, [startAnimation])


  /* scroll from hero CTA */

  const scrollToTimeline = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (showConfirmPage) {
    return <QuoteConfirmPage email={submittedEmail} onReturn={() => setShowConfirmPage(false)} />;
  }

  return (
    <main className="bg-[#fff7f7] text-black overflow-x-hidden">

      {/* HERO */}

      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* grid */}

        <div className="absolute inset-0 opacity-[0.05]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>


        {/* static cards */}

        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
          className="absolute left-24 top-28 w-48 h-32 object-cover rounded-xl shadow-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          className="absolute right-24 top-36 w-56 h-36 object-cover rounded-xl shadow-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692"
          className="absolute left-32 bottom-32 w-52 h-36 object-cover rounded-xl shadow-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475"
          className="absolute right-40 bottom-32 w-48 h-32 object-cover rounded-xl shadow-xl"
        />


        {/* headline */}

        <div className="text-center z-10">

          <h1 className="font-extrabold leading-[0.9] tracking-tight">

            <span className="block text-[110px]">
              BRING YOUR
            </span>

            <span className="block text-[140px] text-[#e10600]">
              VISION
            </span>

            <span className="block text-[110px]">
              TO REALITY
            </span>

          </h1>

          <button
            onClick={scrollToTimeline}
            className="mt-10 bg-[#e10600] text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:scale-105 transition cursor-pointer"
          >
            Build Now
          </button>

        </div>

      </section>


      {/* TIMELINE */}

      <section ref={sectionRef} className="py-28 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-20">
            Tell us about your project
          </h2>

          <div className="relative flex justify-between items-center">

            {/* gray line */}

            <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />

            {/* red animated line */}

            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="absolute top-4 left-0 h-[2px] bg-[#e10600]"
            />


            {steps.map((step, i) => {

              const stepPosition = (i / (steps.length - 1)) * 100
              const active = progress >= stepPosition

              return (
                <div
                  key={i}
                  className="flex flex-col items-center relative z-10"
                >

                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold transition
                    ${active
                        ? "bg-[#e10600] text-white border-[#e10600]"
                        : "bg-white border-gray-300 text-gray-400"
                      }`}
                  >
                    {i + 1}
                  </div>

                  <p
                    className={`mt-4 text-sm transition
                    ${active
                        ? "text-black font-medium"
                        : "text-gray-400"
                      }`}
                  >
                    {step}
                  </p>

                </div>
              )

            })}

          </div>

        </div>

      </section>


      {/* FORM */}

      <section className="pb-32 px-6">

        <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-[#e10600]/20">

          <form ref={form} className="space-y-6" onSubmit={sendEmail}>

            <input
              type="text"
              name="from_name"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <input
              type="email"
              name="to_email"
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <input
              type="text"
              name="project_type"
              placeholder="Project Type (Website, App, AI etc)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <input
              type="text"
              name="budget_range"
              placeholder="Budget Range (Optional)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <input
              type="text"
              name="timeline"
              placeholder="Project Timeline (Optional)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#e10600] text-white py-3 rounded-xl font-medium hover:scale-[1.02] transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending Request..." : "Request Quote"}
            </button>

            {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          </form>
        </div>

      </section>

    </main>
  )
}


