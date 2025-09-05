import { Navigation } from "./Navigation";
import { QuoteOfTheDay } from "../dashboard/QuoteOfTheDay";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex flex-col flex-1 min-h-0 bg-card border-r border-border">
        {/* Navigation */}
        <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
          <Navigation />
        </div>
        
        {/* Quote of the Day */}
        <div className="p-4 border-t border-border">
          <QuoteOfTheDay />
        </div>
      </div>
    </aside>
  );
};