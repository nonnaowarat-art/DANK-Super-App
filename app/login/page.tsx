"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Incorrect email/phone or password");
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-black mb-1">
            <span className="text-white">DANK</span>
            <span className="text-dank-green">.</span>
          </div>
          <p className="text-dank-muted text-sm">Sign in to your account</p>
        </div>

        <div className="bg-dank-card border border-dank-border rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-dank-muted block mb-1.5 uppercase tracking-wider">
                Email or Phone Number
              </label>
              <input
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="your@email.com or 08X-XXX-XXXX"
                className="w-full bg-black border border-dank-border rounded-xl px-4 py-3 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-dank-muted block mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black border border-dank-border rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dank-muted hover:text-white transition-colors"
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
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-dank-green hover:bg-green-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-colors mt-2"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-dank-border text-center">
            <p className="text-sm text-dank-muted">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-dank-green hover:underline font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
