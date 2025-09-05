import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Calendar, 
  CheckSquare, 
  Target, 
  BookOpen, 
  LayoutDashboard,
  StickyNote,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "To-Do List", href: "/todos", icon: CheckSquare },
  { name: "Weekly Planner", href: "/planner", icon: Calendar },
  { name: "Goals & Aims", href: "/goals", icon: Target },
  { name: "Learning Journal", href: "/journal", icon: BookOpen },
  { name: "Quick Notes", href: "/notes", icon: StickyNote },
  { name: "Pomodoro Timer", href: "/timer", icon: Timer },
];

export const Navigation = () => {
  return (
    <nav className="flex-1 space-y-2 px-2 py-4">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover-lift",
                isActive
                  ? "bg-gradient-primary text-white shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};