import { Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function TopBar({ location = "Jakarta, ID" }: { location?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <div className="flex items-center justify-between pt-3 pb-2 animate-fade-in">
      <button className="press flex items-center gap-2 glass rounded-full pl-3 pr-2 py-1.5">
        <span className="w-2 h-2 rounded-full gradient-primary" />
        <span className="text-xs font-medium">{location}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      <div className="flex items-center gap-2">
        <button onClick={toggle} className="press glass rounded-full w-9 h-9 grid place-items-center" aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="press glass rounded-full w-9 h-9 grid place-items-center relative" aria-label="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <div className="press w-9 h-9 rounded-full gradient-primary text-white grid place-items-center font-semibold text-xs shadow-lg">
          IS
        </div>
      </div>
    </div>
  );
}
