import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import ConformPage from "./cnfirmpage";

type ContactFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  consent: false,
};

export default function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showConfirmPage, setShowConfirmPage] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleStartProjectClick = () => {
    document.getElementById("form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const validateForm = () => {
    const nextErrors: ContactFormErrors = {};

    const nameRegex = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^\+?[0-9\s()-]{8,20}$/;
    const phoneDigitsLength = formData.phone.replace(/\D/g, "").length;

    if (!formData.first_name.trim()) {
      nextErrors.first_name = "First name is required.";
    } else if (!nameRegex.test(formData.first_name.trim())) {
      nextErrors.first_name = "Enter a valid first name.";
    }

    if (!formData.last_name.trim()) {
      nextErrors.last_name = "Last name is required.";
    } else if (!nameRegex.test(formData.last_name.trim())) {
      nextErrors.last_name = "Enter a valid last name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone.trim()) || phoneDigitsLength < 8 || phoneDigitsLength > 15) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!formData.service) {
      nextErrors.service = "Please select a service.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 15) {
      nextErrors.message = "Message must be at least 15 characters.";
    }

    if (!formData.consent) {
      nextErrors.consent = "You must agree before submitting.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (submitError) {
      setSubmitError("");
    }
  };


  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm() || !form.current) {
      return;
    }
    const formElement = form.current;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_4otxmn7",
        "template_fwj9qhj",
        formElement,
        "lHBRl4MN0KpqopTMV"
      );

      const contactSheetWebhook =
        "https://script.google.com/macros/s/AKfycbzhXJRpN3Cd7er9tooE6Hs1d7V4uDora8Ec_2B77Md3-8sDuXC9PjwQ9XxXM5B9V8Ca/exec";
      const sheetPayload = {
        fullName: `${formData.first_name} ${formData.last_name}`.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
      };

      try {
        console.info("Contact sheet payload:", sheetPayload);

        const sheetResponse = await fetch(contactSheetWebhook, {
          method: "POST",
          body: JSON.stringify(sheetPayload),
        });

        const rawSheetResponse = await sheetResponse.text();
        console.info("Contact sheet response:", {
          ok: sheetResponse.ok,
          status: sheetResponse.status,
          statusText: sheetResponse.statusText,
          body: rawSheetResponse,
        });

        if (!sheetResponse.ok) {
          throw new Error(`Sheet webhook HTTP ${sheetResponse.status}: ${rawSheetResponse || sheetResponse.statusText}`);
        }

        if (rawSheetResponse) {
          let parsed: { status?: string; message?: string } | null = null;
          try {
            parsed = JSON.parse(rawSheetResponse) as { status?: string; message?: string };
          } catch {
            parsed = null;
          }

          if (parsed?.status && parsed.status !== "success") {
            throw new Error(parsed.message || "Sheet webhook returned non-success status.");
          }
        }
      } catch (sheetError) {
        console.error("Google Sheet sync failed:", {
          endpoint: contactSheetWebhook,
          payload: sheetPayload,
          error: sheetError,
        });
      }

      setSubmittedEmail(formData.email.trim());
      setFormData(initialFormData);
      setErrors({});
      formElement.reset();
      setShowConfirmPage(true);
    } catch (error) {
      console.log("FAILED...", error);
      setSubmitError("Unable to send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnFromConfirm = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    setShowConfirmPage(false);
  };

  const tags = [
    "Logo & Branding",
    "Mobile App Design",
    "3D Design",
    "Web Design & Development",
    "Graphic Design",
  ];

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
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  ];

  if (showConfirmPage) {
    return <ConformPage email={submittedEmail} onReturn={handleReturnFromConfirm} />;
  }

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
            <div
              className="absolute w-[600px] h-[600px] rounded-full
bg-gradient-to-br from-[#E10600]/15 to-transparent blur-[140px]
-left-40 top-10 pointer-events-none"
            />

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[80px] leading-[0.95] font-semibold tracking-tight"
            >
              Let&apos;s Talk<span className="text-[#E10600]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-black/60 text-lg max-w-xl"
            >
              Share your vision and craft your
              <span className="text-black font-medium"> NEXT MASTERPIECE </span>
              with MindSoulix Tech.
            </motion.p>

            {/* TAGS */}
            <div className="mt-10 flex flex-wrap gap-4">
              {tags.map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="px-5 py-2 rounded-md border border-black/10
bg-white backdrop-blur-lg text-sm
hover:border-[#E10600]/40 transition"
                >
                  {tag}
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleStartProjectClick}
              className="mt-10 bg-[#E10600] text-white px-7 py-3 rounded-lg hover:scale-105 transition cursor-pointer"
            >
              Start a Project
            </button>
          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="relative h-[620px] overflow-hidden">
            <div className="flex gap-6 ml-20 mb-6">
              <img src={images[0]} className="w-[160px] h-[180px] rounded-xl object-cover" />
              <img src={images[1]} className="w-[160px] h-[180px] rounded-xl object-cover" />
            </div>

            <div className="flex gap-6 mb-6">
              <img src={images[2]} className="w-[160px] h-[180px] rounded-xl object-cover" />
              <img src={images[3]} className="w-[160px] h-[180px] rounded-xl object-cover" />
              <img src={images[4]} className="w-[160px] h-[180px] rounded-xl object-cover" />
            </div>

            <div className="flex gap-6 ml-20 mb-6">
              <img src={images[5]} className="w-[160px] h-[180px] rounded-xl object-cover" />
              <img src={images[6]} className="w-[160px] h-[180px] rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="form" ref={contactRef} className="w-full py-28 px-10 scroll-mt-32">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-start">
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-5xl font-semibold leading-tight">
              Let&apos;s Talk About Smarter
              <span className="italic text-black/60"> Digital Solutions with MindSoulix</span>
            </h2>

            <p className="text-black/60 mt-6 text-lg max-w-md">
              Whether you need AI automation, scalable platforms, or modern applications, our team is ready to help
              transform your ideas into powerful digital products.
            </p>

            <div className="mt-10 max-w-md rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Company Details</p>

              <div className="mt-4 space-y-3">
                <a
                  href="mailto:hello@mindsoulix.tech"
                  className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-black/80 transition hover:border-[#E10600]/20 hover:bg-[#E10600]/5"
                >
                  <Mail size={18} className="text-[#E10600]" />
                  <span className="text-sm font-medium">hello@mindsoulix.tech</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/mindsoulix-tech"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-black/80 transition hover:border-[#E10600]/20 hover:bg-[#E10600]/5"
                >
                  <Linkedin size={18} className="text-[#E10600]" />
                  <span className="text-sm font-medium">MindSoulix Tech</span>
                </a>

                <a
                  href="https://www.instagram.com/mindsoulix/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-black/80 transition hover:border-[#E10600]/20 hover:bg-[#E10600]/5"
                >
                  <Instagram size={18} className="text-[#E10600]" />
                  <span className="text-sm font-medium">@mindsoulix</span>
                </a>

                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-black/80">
                  <MapPin size={18} className="text-[#E10600]" />
                  <span className="text-sm font-medium">Tech District, San Francisco</span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-2xl border border-black/10 bg-white p-10 shadow-lg">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
              <div>
                <label className="text-sm text-black/60">Full Name</label>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
                    />
                    {errors.first_name && <p className="text-xs text-red-600 mt-1">{errors.first_name}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
                    />
                    {errors.last_name && <p className="text-xs text-red-600 mt-1">{errors.last_name}</p>}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-black/60">Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm text-black/60">Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 Phone Number"
                  className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-sm text-black/60">Services</label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
                >
                  <option value="">Select a service</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="Automation">Automation</option>
                </select>
                {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service}</p>}
              </div>

              <div>
                <label className="text-sm text-black/60">Message</label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Your Message"
                  className="mt-2 w-full bg-white border border-black/10 rounded-lg px-4 py-3 focus:border-[#E10600] outline-none"
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              <label className="flex items-center gap-2 text-sm text-black/60">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="accent-[#E10600]"
                />
                I agree to be contacted regarding this inquiry.
              </label>
              {errors.consent && <p className="text-xs text-red-600 -mt-4">{errors.consent}</p>}

              {submitError && <p className="text-sm text-red-600">{submitError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#E10600] hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white transition px-6 py-3 rounded-lg w-fit font-medium flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting && (
                  <span className="h-4 w-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                )}
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
