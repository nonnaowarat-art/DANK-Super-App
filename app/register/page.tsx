"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, Upload, CheckCircle, ExternalLink } from "lucide-react";
import { signIn } from "next-auth/react";

type Step = "details" | "patient_card" | "done";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [hasCard, setHasCard] = useState<"YES" | "NO" | "">("");
  const [cardImg, setCardImg] = useState<string>("");
  const [cardFileName, setCardFileName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCardFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setCardImg(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      setError("Please enter an email or phone number");
      return;
    }
    setError("");
    setStep("patient_card");
  };

  const handleRegister = async () => {
    if (!hasCard) {
      setError("Please select your patient card status");
      return;
    }
    if (hasCard === "YES" && !cardImg) {
      setError("Please upload your patient card photo");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: email || undefined,
        phone: phone || undefined,
        password,
        patientCard: hasCard,
        patientCardImg: cardImg || undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    // Auto sign in
    await signIn("credentials", {
      login: email || phone,
      password,
      redirect: false,
    });

    setStep("done");
    setLoading(false);
  };

  if (step === "done") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-sm">
          <CheckCircle className="w-16 h-16 text-dank-green mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Welcome to DANK!</h1>
          <p className="text-dank-muted text-sm mb-6">
            Your account is ready. Start earning points with every order.
          </p>
          <button
            onClick={() => router.push("/account")}
            className="w-full bg-dank-green hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-colors"
          >
            Go to My Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-black mb-1">
            <span className="text-white">DANK</span>
            <span className="text-dank-green">.</span>
          </div>
          <p className="text-dank-muted text-sm">Create your account</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {["details", "patient_card"].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                  step === s
                    ? "bg-dank-green text-black border-dank-green"
                    : i < ["details", "patient_card"].indexOf(step)
                    ? "bg-dank-green/20 text-dank-green border-dank-green/40"
                    : "bg-transparent text-dank-muted border-dank-border"
                }`}
              >
                {i + 1}
              </div>
              {i < 1 && <div className="flex-1 h-px bg-dank-border" />}
            </div>
          ))}
        </div>

        <div className="bg-dank-card border border-dank-border rounded-2xl p-6">
          {/* STEP 1: Account details */}
          {step === "details" && (
            <form onSubmit={handleDetailsNext} className="space-y-4">
              <h2 className="font-bold text-base mb-1">Account Details</h2>

              <div>
                <label className="text-xs text-dank-muted block mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full bg-black border border-dank-border rounded-xl px-4 py-3 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-dank-muted block mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-black border border-dank-border rounded-xl px-4 py-3 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-dank-border" />
                <span className="text-xs text-dank-muted">or</span>
                <div className="flex-1 h-px bg-dank-border" />
              </div>

              <div>
                <label className="text-xs text-dank-muted block mb-1.5 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="w-full bg-black border border-dank-border rounded-xl px-4 py-3 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-dank-muted block mb-1.5 uppercase tracking-wider">
                  Password *
                </label>
                <div className="relative">
                  <input
                    required
                    minLength={6}
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-black border border-dank-border rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dank-muted hover:text-white"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-dank-green hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-colors"
              >
                Next →
              </button>
            </form>
          )}

          {/* STEP 2: Patient card */}
          {step === "patient_card" && (
            <div className="space-y-4">
              <div>
                <h2 className="font-bold text-base mb-0.5">Cannabis Patient Card</h2>
                <p className="text-xs text-dank-muted">
                  Required to purchase in Thailand
                </p>
              </div>

              {/* Yes / No toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setHasCard("YES")}
                  className={`py-4 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-1.5 ${
                    hasCard === "YES"
                      ? "border-dank-green bg-dank-green/10 text-dank-green"
                      : "border-dank-border text-dank-muted hover:border-dank-green/40"
                  }`}
                >
                  <span className="text-2xl">✅</span>
                  I have one
                </button>
                <button
                  onClick={() => setHasCard("NO")}
                  className={`py-4 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-1.5 ${
                    hasCard === "NO"
                      ? "border-amber-400 bg-amber-400/10 text-amber-400"
                      : "border-dank-border text-dank-muted hover:border-amber-400/40"
                  }`}
                >
                  <span className="text-2xl">📋</span>
                  I don&apos;t have one
                </button>
              </div>

              {/* Has card → upload */}
              {hasCard === "YES" && (
                <div className="space-y-3">
                  <p className="text-xs text-dank-muted">
                    Upload a photo of your patient card for verification.
                  </p>
                  <label className="block">
                    <div
                      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                        cardImg
                          ? "border-dank-green bg-dank-green/5"
                          : "border-dank-border hover:border-dank-green/50"
                      }`}
                    >
                      {cardImg ? (
                        <div className="flex flex-col items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cardImg}
                            alt="Patient card"
                            className="max-h-32 rounded-lg object-contain"
                          />
                          <p className="text-xs text-dank-green font-medium">
                            ✓ {cardFileName}
                          </p>
                          <p className="text-xs text-dank-muted">
                            Click to change
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-dank-muted">
                          <Upload className="w-8 h-8" />
                          <p className="text-sm font-medium">
                            Upload patient card photo
                          </p>
                          <p className="text-xs">JPG, PNG · max 5MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* No card → guide */}
              {hasCard === "NO" && (
                <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-amber-400">
                    📋 How to get a Cannabis Patient Card
                  </p>
                  <ol className="text-xs text-gray-300 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>
                      Visit any hospital or registered clinic in Thailand
                    </li>
                    <li>
                      See a licensed doctor and explain your symptoms (stress,
                      pain, sleep issues, etc.)
                    </li>
                    <li>
                      Doctor issues a <strong>cannabis prescription</strong> and
                      registers you in the{" "}
                      <strong>Mor Prom system</strong>
                    </li>
                    <li>
                      You receive your digital or physical patient card —
                      usually same day
                    </li>
                  </ol>
                  <a
                    href="https://oryor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    FDA Thailand — official info
                  </a>
                  <p className="text-xs text-dank-muted border-t border-dank-border/50 pt-2">
                    You can still register and browse — just upload your card
                    before your first order.
                  </p>
                </div>
              )}

              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { setStep("details"); setError(""); }}
                  className="px-4 py-3 rounded-xl border border-dank-border text-sm text-dank-muted hover:text-white hover:border-white/20 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleRegister}
                  disabled={loading || !hasCard}
                  className="flex-1 flex items-center justify-center gap-2 bg-dank-green hover:bg-green-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-dank-muted mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-dank-green hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
