import Link from "next/link";
import { Instagram, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-dank-border bg-dank-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="text-3xl font-black mb-3">
            <span className="text-white">DANK</span>
            <span className="text-dank-green">.</span>
          </div>
          <p className="text-dank-muted text-sm leading-relaxed max-w-sm">
            Bangkok&apos;s premier cannabis club. AI-powered operations, human-driven
            experience. Premium flower, edibles, vapes and more.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://www.instagram.com/dankbkk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-dank-muted hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @dankbkk
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-2">
            {["Flower", "Edibles", "Vapes", "Concentrates", "Accessories"].map(
              (cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${cat}`}
                    className="text-sm text-dank-muted hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Visit Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-dank-muted">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-dank-green" />
              <span>Bangkok, Thailand</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-dank-muted">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-dank-green" />
              <span>
                Mon–Sun
                <br />
                12:00 – 00:00
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-dank-border px-4 sm:px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-2">
        <p className="text-xs text-dank-muted">
          © {new Date().getFullYear()} DANK Cannabis Club. All rights reserved.
        </p>
        <p className="text-xs text-dank-muted">
          For adults 20+ only. Please consume responsibly.
        </p>
      </div>
    </footer>
  );
}
