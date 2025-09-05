import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TodaysFocus } from "@/components/dashboard/TodaysFocus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock, Target } from "lucide-react";

const UpcomingDeadlines = () => {
  const deadlines = [
    { title: "Math Assignment", date: "Tomorrow", progress: 75, color: "bg-warning" },
    { title: "Chemistry Lab Report", date: "In 3 days", progress: 20, color: "bg-destructive" },
    { title: "History Essay", date: "Next week", progress: 0, color: "bg-muted-foreground" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <CalendarDays className="mr-2 h-5 w-5 text-primary" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.map((deadline, index) => (
          <div key={deadline.title} className="space-y-2 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{deadline.title}</p>
              <span className="text-xs text-muted-foreground">{deadline.date}</span>
            </div>
            <Progress value={deadline.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{deadline.progress}% complete</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const RecentGoals = () => {
  const goals = [
    { title: "Complete 50 math problems", progress: 82, target: "Weekly Goal" },
    { title: "Read 3 chapters daily", progress: 60, target: "Study Goal" },
    { title: "Exercise 4 times a week", progress: 100, target: "Health Goal" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Target className="mr-2 h-5 w-5 text-primary" />
          Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => (
          <div key={goal.title} className="space-y-2 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">{goal.title}</p>
                <span className="text-xs text-muted-foreground">{goal.target}</span>
              </div>
              <span className="text-sm font-bold text-primary">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-soft p-8 rounded-xl border border-border/50">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Good morning! 🌟
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to tackle your goals today? Here's your productivity overview.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <DashboardStats />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Focus - Takes up 2 columns on larger screens */}
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <TodaysFocus />
        </div>

        {/* Upcoming Deadlines */}
        <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
          <UpcomingDeadlines />
        </div>

        {/* Recent Goals - Takes up 2 columns */}
        <div className="md:col-span-2 animate-fade-in" style={{ animationDelay: "800ms" }}>
          <RecentGoals />
        </div>

        {/* Quick Stats Card */}
        <div className="animate-fade-in" style={{ animationDelay: "1000ms" }}>
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">47</div>
                <p className="text-sm text-muted-foreground">Hours Studied</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">23</div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">5</div>
                <p className="text-sm text-muted-foreground">Goals Achieved</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}