import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Sparkles, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, hasRole, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Campus<span className="text-gradient">Fest</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Button>
                </Link>
                {hasRole("admin") && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4" /> Admin
                    </Button>
                  </Link>
                )}
                {(hasRole("organizer") || hasRole("admin")) && (
                  <Link to="/create-event">
                    <Button variant="gradient" size="sm">
                      <Calendar className="w-4 h-4" /> Host Event
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button variant="gradient" size="sm">
                    <Calendar className="w-4 h-4" /> Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="justify-start w-full"><LayoutDashboard className="w-4 h-4" /> Dashboard</Button>
                    </Link>
                    {(hasRole("organizer") || hasRole("admin")) && (
                      <Link to="/create-event" onClick={() => setIsOpen(false)}>
                        <Button variant="gradient" className="w-full"><Calendar className="w-4 h-4" /> Host Event</Button>
                      </Link>
                    )}
                    <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="gradient" className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
