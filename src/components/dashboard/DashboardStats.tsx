import { CheckCircle, Target, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  // In a real app, these would come from your state/API
  const stats = [
    {
      title: "Tasks Completed",
      value: 12,
      description: "3 more than yesterday",
      icon: CheckCircle,
      color: "success" as const
    },
    {
      title: "Active Goals",
      value: 5,
      description: "2 nearing completion",
      icon: Target,
      color: "primary" as const
    },
    {
      title: "Journal Entries",
      value: 28,
      description: "This month",
      icon: BookOpen,
      color: "secondary" as const
    },
    {
      title: "Weekly Progress",
      value: "73%",
      description: "Above average week",
      icon: Calendar,
      color: "warning" as const
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};