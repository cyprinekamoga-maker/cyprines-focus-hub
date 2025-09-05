import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Don't be afraid to give yourself everything you've ever wanted in life.",
    author: "Unknown"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
];

export const QuoteOfTheDay = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="card-soft p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Daily Inspiration</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={getRandomQuote}
          className="h-6 w-6 hover:bg-muted"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
      
      <blockquote className="space-y-2">
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          "{currentQuote.text}"
        </p>
        <footer className="text-xs font-medium text-primary">
          — {currentQuote.author}
        </footer>
      </blockquote>
    </div>
  );
};