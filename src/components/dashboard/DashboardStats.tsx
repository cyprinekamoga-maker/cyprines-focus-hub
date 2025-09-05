import { useState, useEffect } from "react";
import { CheckCircle, Target, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<any>;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "success" | "warning" | "secondary";
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  color = "primary" 
}: StatCardProps) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success-light",
    warning: "text-warning bg-warning-light",
    secondary: "text-secondary-foreground bg-secondary"
  };

  return (
    <Card className="hover-lift">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalTodos: 0,
    completedTodos: 0,
    upcomingEvents: 0,
    activeGoals: 0,
    journalEntries: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const [todosRes, eventsRes, goalsRes, journalRes] = await Promise.all([
        supabase.from("todos").select("completed").eq("user_id", user?.id),
        supabase.from("events").select("id").eq("user_id", user?.id).gte("start_time", new Date().toISOString()),
        supabase.from("goals").select("completed").eq("user_id", user?.id),
        supabase.from("journal_entries").select("id").eq("user_id", user?.id)
      ]);

      const todos = todosRes.data || [];
      const completedTodos = todos.filter(todo => todo.completed).length;
      const goals = goalsRes.data || [];
      const activeGoals = goals.filter(goal => !goal.completed).length;

      setStats({
        totalTodos: todos.length,
        completedTodos,
        upcomingEvents: eventsRes.data?.length || 0,
        activeGoals,
        journalEntries: journalRes.data?.length || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const completionRate = stats.totalTodos > 0 ? Math.round((stats.completedTodos / stats.totalTodos) * 100) : 0;

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-8 w-8 bg-muted rounded-lg"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Tasks Completed",
      value: stats.totalTodos > 0 ? `${stats.completedTodos}/${stats.totalTodos}` : "0",
      description: stats.totalTodos > 0 ? `${completionRate}% completion rate` : "No tasks yet",
      icon: CheckCircle,
      color: "success" as const
    },
    {
      title: "Active Goals",
      value: stats.activeGoals,
      description: stats.activeGoals === 0 ? "No goals set yet" : `${stats.activeGoals} in progress`,
      icon: Target,
      color: "primary" as const
    },
    {
      title: "Journal Entries",
      value: stats.journalEntries,
      description: stats.journalEntries === 0 ? "Start journaling!" : "Total entries",
      icon: BookOpen,
      color: "secondary" as const
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      description: stats.upcomingEvents === 0 ? "No events scheduled" : "This week",
      icon: Calendar,
      color: "warning" as const
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <div key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};