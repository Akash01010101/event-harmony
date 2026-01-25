import { Link } from "react-router-dom";
import { Sparkles, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const links = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Integrations", href: "/integrations" },
      { name: "API", href: "/api" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/help" },
      { name: "Guides", href: "/guides" },
      { name: "Webinars", href: "/webinars" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/partners" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-background">
                CampusFest
              </span>
            </Link>
            <p className="text-background/60 text-sm mb-4">
              Making college events memorable and manageable.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold text-background mb-4 capitalize">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-background/60 hover:text-background text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © 2024 CampusFest. All rights reserved.
          </p>
          <p className="text-background/60 text-sm">
            Made with ❤️ for colleges worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
