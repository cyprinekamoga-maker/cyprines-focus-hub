import { useState } from "react";
import { Plus, Edit3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FocusItem {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export const TodaysFocus = () => {
  const [focusItems, setFocusItems] = useState<FocusItem[]>([
    { id: "1", text: "Complete math assignment", completed: false, priority: "high" },
    { id: "2", text: "Review chemistry notes", completed: true, priority: "medium" },
    { id: "3", text: "Plan weekend study schedule", completed: false, priority: "low" }
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState("");

  const toggleComplete = (id: string) => {
    setFocusItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addNewItem = () => {
    if (newItem.trim()) {
      const item: FocusItem = {
        id: Date.now().toString(),
        text: newItem.trim(),
        completed: false,
        priority: "medium"
      };
      setFocusItems(items => [...items, item]);
      setNewItem("");
      setIsAdding(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <Card className="card-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Today's Focus</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsAdding(true)}
            className="text-primary hover:bg-primary/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Focus
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {focusItems.map((item, index) => (
          <div 
            key={item.id}
            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button
              onClick={() => toggleComplete(item.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                item.completed 
                  ? "bg-success border-success text-success-foreground" 
                  : "border-muted-foreground hover:border-primary"
              }`}
            >
              {item.completed && <Check className="h-3 w-3" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {item.text}
              </p>
            </div>
            
            <Badge variant={getPriorityColor(item.priority)} className="text-xs">
              {item.priority}
            </Badge>
          </div>
        ))}

        {isAdding && (
          <div className="flex items-center space-x-2 animate-bounce-in">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="What's your focus today?"
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && addNewItem()}
              autoFocus
            />
            <Button size="sm" onClick={addNewItem}>
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setIsAdding(false);
                setNewItem("");
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        {focusItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No focus items yet.</p>
            <p className="text-xs">Add your top priorities for today!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};