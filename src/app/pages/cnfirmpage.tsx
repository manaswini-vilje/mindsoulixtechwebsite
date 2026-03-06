type CnfirmPageProps = {
  email: string;
  onReturn: () => void;
};

export default function ConformPage({ email, onReturn }: CnfirmPageProps) {
  return (
    <div className="min-h-screen bg-[#fff7f7] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-10 shadow-xl">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E10600]/10 text-[#E10600]">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.4]">
            <path d="M20 7L10 17l-6-6" />
          </svg>
        </div>

        <h1 className="mt-6 text-4xl font-semibold leading-tight text-black">Your response was submitted.</h1>

        <p className="mt-4 text-lg text-black/70">
          Thank you for contacting MindSoulix Tech. Our professional team will contact you within 24 hours.
        </p>

        <div className="mt-7 rounded-2xl border border-[#E10600]/20 bg-[#E10600]/5 p-5">
          <p className="text-sm font-medium uppercase tracking-wide text-[#E10600]">Email Notification</p>
          <p className="mt-2 text-black/80">Check your email: {email || "your registered email address"}.</p>
          <p className="mt-1 text-black/70">
            We have sent a notification for your inquiry through our EmailJS workflow.
          </p>
        </div>

        <button
          type="button"
          onClick={onReturn}
          className="mt-8 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-black/85 cursor-pointer"
        >
          Return to Previous Page
        </button>
      </div>
    </div>
  );
}
