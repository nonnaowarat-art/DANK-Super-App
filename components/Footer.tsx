import Link from "next/link";
import { Instagram, MapPin, Clock, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-dank-border bg-dank-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Image
            src="/logo.png"
            alt="DANK Cannabis Club"
            width={100}
            height={100}
            className="h-20 w-auto object-contain mb-3"
          />
          <p className="text-dank-muted text-sm leading-relaxed max-w-sm">
            Bangkok&apos;s premier cannabis club. AI-powered operations, human-driven
            experience. Premium flower, edibles, vapes and more.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <a
              href="https://www.instagram.com/dankclub.official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-dank-muted hover:text-white transition-colors w-fit"
            >
              <Instagram className="w-4 h-4" />
              @dankclub.official
            </a>
            <a
              href="https://line.me/ti/p/@dankclubbkk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-dank-muted hover:text-white transition-colors w-fit"
            >
              <span className="w-4 h-4 flex items-center justify-center text-[10px] font-black bg-green-500 text-white rounded-sm">L</span>
              LINE: @dankclubbkk
            </a>
            <a
              href="tel:0841620610"
              className="flex items-center gap-2 text-sm text-dank-muted hover:text-white transition-colors w-fit"
            >
              <Phone className="w-4 h-4" />
              084-162-0610
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
          <h3 className="text-sm font-semibold text-white mb-3">Find Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-dank-muted">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-dank-green" />
              <a
                href="https://maps.app.goo.gl/Baq25RxznXyLc5VB7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Phatthanakan 1st Alley
                <br />
                Bangkok, Thailand
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-dank-muted">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-dank-green" />
              <span>
                Open <span className="text-dank-green font-semibold">24 Hours</span>
                <br />
                Pickup &amp; Delivery
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-dank-border px-4 sm:px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-dank-muted">
          © {new Date().getFullYear()} DANK Cannabis Club · Bangkok. All rights reserved.
        </p>
        <p className="text-xs text-dank-muted">
          For adults 20+ only. Please consume responsibly.
        </p>
      </div>
    </footer>
  );
}
