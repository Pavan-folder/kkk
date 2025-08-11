import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/layout/navigation";
import NotFound from "@/pages/not-found";
import OnboardingPage from "@/pages/onboarding";
import DashboardPage from "@/pages/dashboard";
import DiscoverPage from "@/pages/discover";
import ProfileDetailPage from "@/pages/profile-detail";
import MatchesPage from "@/pages/matches";
import WorkflowPage from "@/pages/workflow";
import MessagesPage from "@/pages/messages";
import ProfilePage from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={OnboardingPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/discover" component={DiscoverPage} />
      <Route path="/profile-detail/:id" component={ProfileDetailPage} />
      <Route path="/matches" component={MatchesPage} />
      <Route path="/workflow" component={WorkflowPage} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-light-bg">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Router />
          </main>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
