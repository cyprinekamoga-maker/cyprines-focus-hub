import { useState, useEffect } from "react";
import { Plus, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface FocusItem {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  subject?: string;
}

export const TodaysFocus = () => {
  const [focusItems, setFocusItems] = useState<FocusItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedTodos = data?.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        priority: todo.priority as "high" | "medium" | "low",
        subject: todo.subject
      })) || [];

      setFocusItems(formattedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast({
        title: "Error",
        description: "Failed to load todos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const item = focusItems.find(item => item.id === id);
      if (!item) return;

      const { error } = await supabase
        .from("todos")
        .update({ 
          completed: !item.completed,
          completed_at: !item.completed ? new Date().toISOString() : null
        })
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) throw error;

      setFocusItems(items =>
        items.map(item =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      toast({
        title: "Error",
        description: "Failed to update todo",
        variant: "destructive",
      });
    }
  };

  const addNewItem = async () => {
    if (!newItem.trim() || !user) return;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert({
          title: newItem.trim(),
          priority: newPriority,
          subject: newSubject || null,
          user_id: user.id,
          completed: false
        })
        .select()
        .single();

      if (error) throw error;

      const newFocusItem: FocusItem = {
        id: data.id,
        title: data.title,
        completed: data.completed,
        priority: data.priority as "high" | "medium" | "low",
        subject: data.subject
      };

      setFocusItems(items => [newFocusItem, ...items]);
      setNewItem("");
      setNewSubject("");
      setNewPriority("medium");
      setIsAdding(false);

      toast({
        title: "Success",
        description: "Todo added successfully",
      });
    } catch (error) {
      console.error("Error adding todo:", error);
      toast({
        title: "Error",
        description: "Failed to add todo",
        variant: "destructive",
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) throw error;

      setFocusItems(items => items.filter(item => item.id !== id));
      
      toast({
        title: "Success",
        description: "Todo deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      });
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

  if (loading) {
    return (
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Today's Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Loading your todos...
          </div>
        </CardContent>
      </Card>
    );
  }

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
            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up group"
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
                {item.title}
              </p>
              {item.subject && (
                <p className="text-xs text-muted-foreground">{item.subject}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityColor(item.priority)} className="text-xs">
                {item.priority}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTodo(item.id)}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        {isAdding && (
          <div className="space-y-3 p-3 rounded-lg bg-muted/30 animate-bounce-in">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="What's your focus today?"
              onKeyPress={(e) => e.key === "Enter" && addNewItem()}
              autoFocus
            />
            <div className="flex gap-2">
              <Input
                placeholder="Subject (optional)"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1"
              />
              <Select value={newPriority} onValueChange={(value: "high" | "medium" | "low") => setNewPriority(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={addNewItem} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Todo
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsAdding(false);
                  setNewItem("");
                  setNewSubject("");
                  setNewPriority("medium");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {focusItems.length === 0 && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No focus items yet.</p>
            <p className="text-xs">Add your top priorities for today!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};