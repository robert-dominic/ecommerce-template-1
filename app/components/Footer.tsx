import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/app/hooks/constants";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  x: FaXTwitter,
  youtube: FaYoutube,
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div>
            <p className="font-logo text-2xl font-bold mb-4">OTAKU</p>
            <p className="text-gray-400 text-sm max-w-xs mb-4">
              Premium anime-inspired streetwear and merch for fans who wear their passion. From iconic series to original designs—quality gear for the culture.
            </p>
            <p className="text-gray-500 text-sm max-w-xs">
              Official drops, limited collabs, and gear that hits different. Stay tuned for new collections and restocks.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-white transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact & follow</h3>
            <p className="text-gray-400 text-sm mb-4">
              <Link href="/contact" className="hover:text-white transition">Get in touch</Link>
              {" "}— we reply to every message. For orders and support:
            </p>
            <p className="text-gray-400 text-sm mb-6">
              <a href="mailto:support@otaku.com" className="hover:text-white transition">support@otaku.com</a>
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ name, href, iconKey }) => {
                const Icon = SOCIAL_ICONS[iconKey];
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-white/10"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          © {currentYear} OTAKU. All rights reserved. Anime-inspired apparel for the community.
        </div>
      </div>
    </footer>
  );
}
