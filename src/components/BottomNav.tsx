import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, Bookmark, MessageCircle, User } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Compass, label: "Jelajahi" },
  { to: "/bookmarks", icon: Bookmark, label: "Tersimpan" },
  { to: "/messages", icon: MessageCircle, label: "Pesan" },
  { to: "/profile", icon: User, label: "Profil" },
] as const;

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md">
      <div className="glass-strong rounded-full px-1.5 py-1.5 flex items-center justify-between">
        {items.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <Link key={to} to={to} className="flex-1 press">
              <div className={`flex flex-col items-center gap-0.5 py-2 rounded-full transition-all ${active ? "gradient-primary text-white shadow-lg" : "text-muted-foreground"}`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
                <span className="text-[9px] font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
