"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
} from "lucide-react";

/* ── Office locations ── */
const OFFICES = [
  "Nairobi",
  "Lagos",
  "Accra",
  "Cape Town",
  "Cairo",
  "Remote",
] as const;

/* ── Form state type ── */
interface SignatureForm {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  twitter: string;
  office: string;
}

const DEFAULT_FORM: SignatureForm = {
  fullName: "",
  title: "",
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
  office: "Nairobi",
};

/* ══════════════════════════════════════════════════════════════════════════
   EMAIL SIGNATURE PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function EmailSignature() {
  const [form, setForm] = useState<SignatureForm>(DEFAULT_FORM);
  const [copyStatus, setCopyStatus] = useState<"idle" | "html" | "text">("idle");

  const updateField = useCallback(
    (field: keyof SignatureForm, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  /* ── Generate email-compatible HTML ── */
  const signatureHTML = useCallback(() => {
    const { fullName, title, email, phone, linkedin, twitter, office } = form;
    const displayName = fullName || "Your Name";
    const displayTitle = title || "Your Title";
    const displayEmail = email || "name@xcelerolabs.com";

    // Build contact line
    const contactParts: string[] = [];
    if (email) contactParts.push(`<a href="mailto:${email}" style="color:#111111;text-decoration:none;">${displayEmail}</a>`);
    else contactParts.push(`<span style="color:#111111;">name@xcelerolabs.com</span>`);
    if (phone) contactParts.push(`<a href="tel:${phone}" style="color:#111111;text-decoration:none;">${phone}</a>`);

    // Build social line
    const socialParts: string[] = [];
    if (linkedin) {
      const linkedinHandle = linkedin.replace(/\/$/, "").split("/").pop() || linkedin;
      socialParts.push(`<a href="${linkedin}" style="color:#FF4D00;text-decoration:none;font-weight:600;">LinkedIn</a>`);
    }
    if (twitter) {
      const handle = twitter.startsWith("@") ? twitter : `@${twitter}`;
      socialParts.push(`<a href="https://x.com/${handle.replace("@", "")}" style="color:#FF4D00;text-decoration:none;font-weight:600;">${handle}</a>`);
    }

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#111111;max-width:480px;">
  <tr>
    <td style="vertical-align:top;padding-right:14px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background-color:#FF4D00;width:40px;height:40px;text-align:center;vertical-align:middle;">
            <span style="color:#ffffff;font-weight:bold;font-size:16px;font-family:Arial,Helvetica,sans-serif;">X</span>
          </td>
        </tr>
      </table>
    </td>
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:16px;font-weight:700;color:#111111;line-height:1.3;font-family:Arial,Helvetica,sans-serif;">
            ${displayName}
          </td>
        </tr>
        <tr>
          <td style="font-size:12px;font-weight:600;color:#FF4D00;line-height:1.4;padding-top:1px;font-family:Arial,Helvetica,sans-serif;">
            ${displayTitle}
          </td>
        </tr>
        <tr>
          <td style="padding-top:8px;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
              ${contactParts.map((part, i) => `<tr><td style="color:#111111;">${i > 0 ? "<span style=\"color:#cccccc;\">&nbsp;|&nbsp;</span>" : ""}${part}</td></tr>`).join("\n              ")}
            </table>
          </td>
        </tr>
        ${socialParts.length > 0 ? `<tr>
          <td style="padding-top:6px;font-size:12px;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
            ${socialParts.join('<span style="color:#cccccc;">&nbsp;|&nbsp;</span>')}
          </td>
        </tr>` : ""}
        ${office ? `<tr>
          <td style="padding-top:6px;font-size:11px;color:#888888;line-height:1.4;font-family:Arial,Helvetica,sans-serif;">
            ${office}
          </td>
        </tr>` : ""}
        <tr>
          <td style="padding-top:8px;">
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr><td style="height:1px;background-color:#FF4D00;font-size:1px;line-height:1px;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-top:6px;font-size:10px;color:#999999;line-height:1.4;font-family:Arial,Helvetica,sans-serif;letter-spacing:0.02em;">
            <strong style="color:#111111;font-size:11px;">xCelero Labs</strong>&nbsp;&mdash;&nbsp;Venture platform for critical technology
          </td>
        </tr>
        <tr>
          <td style="padding-top:2px;font-size:9px;color:#bbbbbb;line-height:1.3;font-family:Arial,Helvetica,sans-serif;">
            <a href="https://xcelerolabs.com" style="color:#FF4D00;text-decoration:none;">xcelerolabs.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  }, [form]);

  /* ── Generate plain text version ── */
  const signatureText = useCallback(() => {
    const { fullName, title, email, phone, linkedin, twitter, office } = form;
    const displayName = fullName || "Your Name";
    const displayTitle = title || "Your Title";
    const displayEmail = email || "name@xcelerolabs.com";

    const lines: string[] = [
      displayName,
      displayTitle,
      "---",
      displayEmail,
    ];
    if (phone) lines.push(phone);
    if (linkedin) lines.push(linkedin);
    if (twitter) {
      const handle = twitter.startsWith("@") ? twitter : `@${twitter}`;
      lines.push(`X: ${handle}`);
    }
    if (office) lines.push(office);
    lines.push("---");
    lines.push("xCelero Labs — Venture platform for critical technology");
    lines.push("xcelerolabs.com");

    return lines.join("\n");
  }, [form]);

  /* ── Copy handlers ── */
  const copyHTML = useCallback(async () => {
    try {
      const html = signatureHTML();
      const blob = new Blob([html], { type: "text/html" });
      const textBlob = new Blob([html], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob,
        }),
      ]);
      setCopyStatus("html");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      // Fallback for older browsers
      await navigator.clipboard.writeText(signatureHTML());
      setCopyStatus("html");
      setTimeout(() => setCopyStatus("idle"), 2500);
    }
  }, [signatureHTML]);

  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(signatureText());
      setCopyStatus("text");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      // silent fail
    }
  }, [signatureText]);

  return (
    <div className="bg-white text-[#111111]">
      <OpeningSection />
      <BuilderSection
        form={form}
        updateField={updateField}
        signatureHTML={signatureHTML}
        copyHTML={copyHTML}
        copyText={copyText}
        copyStatus={copyStatus}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   OPENING SECTION
   ══════════════════════════════════════════════════════════════════════════ */
function OpeningSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="pt-16 sm:pt-20 md:pt-28 pb-0 px-5 sm:px-6 md:px-12 lg:px-20">
      <div ref={ref} className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-6 block">
            Email Signature
          </span>

          <h1 className="text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.08] font-display font-medium tracking-[-0.02em] mb-6">
            Your signature,{" "}
            <em className="italic font-serif text-[#FF4D00]">on brand</em>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-[1.6] text-[#111111]/45 font-medium max-w-2xl">
            Generate a professional, xCelero-branded email signature in seconds.
            Fill in your details, preview it live, and copy it straight into your
            email client.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BUILDER SECTION: Form + Live Preview
   ══════════════════════════════════════════════════════════════════════════ */
function BuilderSection({
  form,
  updateField,
  signatureHTML,
  copyHTML,
  copyText,
  copyStatus,
}: {
  form: SignatureForm;
  updateField: (field: keyof SignatureForm, value: string) => void;
  signatureHTML: () => string;
  copyHTML: () => void;
  copyText: () => void;
  copyStatus: "idle" | "html" | "text";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-5 sm:px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16"
        >
          {/* Left: Form */}
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
              Your Details
            </span>
            <div className="space-y-5">
              <InputField
                label="Full Name"
                value={form.fullName}
                onChange={(v) => updateField("fullName", v)}
                placeholder="e.g. Amina Osei-Mensah"
                required
              />
              <InputField
                label="Title / Role"
                value={form.title}
                onChange={(v) => updateField("title", v)}
                placeholder="e.g. Founder & CEO"
                required
              />
              <InputField
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                placeholder="e.g. ame@xcelerolabs.com"
                required
              />
              <InputField
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                placeholder="e.g. +254 700 000 000"
              />
              <InputField
                label="LinkedIn URL"
                type="url"
                value={form.linkedin}
                onChange={(v) => updateField("linkedin", v)}
                placeholder="e.g. https://linkedin.com/in/amina"
              />
              <InputField
                label="X (Twitter) Handle"
                value={form.twitter}
                onChange={(v) => updateField("twitter", v)}
                placeholder="e.g. @xcelerolabs"
              />
              <div>
                <label className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/50 mb-2 block">
                  Office Location
                </label>
                <select
                  value={form.office}
                  onChange={(e) => updateField("office", e.target.value)}
                  className="w-full bg-white border border-[#111111]/15 px-4 py-3 text-[14px] font-medium text-[#111111] focus:outline-none focus:border-[#FF4D00] focus:ring-0 transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  {OFFICES.map((office) => (
                    <option key={office} value={office}>
                      {office}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right: Live Preview + Copy */}
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
              Live Preview
            </span>

            {/* Preview card */}
            <div className="bg-white border border-[#111111]/10 p-6 md:p-8 mb-6 shadow-sm">
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/20 mb-5">
                Email Signature Preview
              </div>
              {/* Rendered signature preview */}
              <div
                dangerouslySetInnerHTML={{ __html: signatureHTML() }}
              />

              {/* Separator hint */}
              <div className="mt-6 pt-4 border-t border-[#111111]/5">
                <p className="text-[11px] text-[#111111]/30 font-medium">
                  This is how your signature will appear in email clients.
                </p>
              </div>
            </div>

            {/* Copy buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={copyHTML}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00]/90 transition-colors min-h-[44px]"
              >
                {copyStatus === "html" ? (
                  <>
                    <Check className="w-4 h-4" />
                    HTML Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy HTML
                  </>
                )}
              </button>
              <button
                onClick={copyText}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#111111] text-[#111111] text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#111111] hover:text-white transition-colors min-h-[44px]"
              >
                {copyStatus === "text" ? (
                  <>
                    <Check className="w-4 h-4" />
                    Text Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </>
                )}
              </button>
            </div>

            {/* Copy success message */}
            {copyStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-[#FF4D00]/5 border border-[#FF4D00]/15"
              >
                <Check className="w-3.5 h-3.5 text-[#FF4D00]" />
                <span className="text-[12px] font-medium text-[#FF4D00]">
                  {copyStatus === "html"
                    ? "Signature HTML copied to clipboard. Paste it into your email client's signature settings."
                    : "Plain text signature copied to clipboard."}
                </span>
              </motion.div>
            )}

            {/* Tips */}
            <div className="mt-8 border-t border-[#111111]/10 pt-6">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mb-3 block">
                How to use
              </span>
              <div className="space-y-2">
                <TipStep
                  number="01"
                  text="Fill in your details in the form on the left."
                />
                <TipStep
                  number="02"
                  text='Click "Copy HTML" to copy the rich signature.'
                />
                <TipStep
                  number="03"
                  text="Paste it into your email client's signature settings (Gmail: Settings → General → Signature → paste)."
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Input Field ── */
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/50 mb-2 block">
        {label}
        {required && <span className="text-[#FF4D00] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-[#111111]/15 px-4 py-3 text-[14px] font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-0 transition-colors"
      />
    </div>
  );
}

/* ── Tip Step ── */
function TipStep({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[11px] font-mono font-bold tracking-[0.1em] text-[#FF4D00]/60 mt-0.5 shrink-0">
        {number}
      </span>
      <p className="text-[13px] text-[#111111]/45 font-medium leading-[1.6]">
        {text}
      </p>
    </div>
  );
}
