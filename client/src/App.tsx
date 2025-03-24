import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import ProfileSelection from "@/pages/ProfileSelection";
import Home from "@/pages/Home";
import DetailView from "@/pages/DetailView";
import { ProfileProvider } from "@/components/providers/profile-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ProfileSelection} />
      <Route path="/profile/:profileType" component={Home} />
      <Route path="/details/:type/:id" component={DetailView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <Router />
        <Toaster />
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
