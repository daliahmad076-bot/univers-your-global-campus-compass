import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";
import { LevelProvider } from "@/lib/level";
import { GeoProvider } from "@/lib/geolocation";
import Splash from "@/components/Splash";
import Onboarding from "@/components/Onboarding";
import Login from "@/components/Login";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#F5B97A" },
      { title: "Univers — Discover Your Future" },
      { name: "description", content: "Univers is your intelligent education companion to discover schools and universities worldwide." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "icon", type: "image/png", sizes: "1024x1024", href: "/icon-1024.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "apple-touch-icon", sizes: "1024x1024", href: "/icon-1024.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body suppressHydrationWarning>{children}<Scripts /></body>
    </html>
  );
}

type Stage = "splash" | "onboarding" | "login" | "app";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [stage, setStage] = useState<Stage>("splash");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const splashSeen = sessionStorage.getItem("univers-splash-seen");
    const onboarded = localStorage.getItem("univers-onboarded");
    const signedIn = localStorage.getItem("univers-signed-in");
    if (splashSeen) {
      if (!onboarded) setStage("onboarding");
      else if (!signedIn) setStage("login");
      else setStage("app");
    }
    setReady(true);
  }, []);

  function afterSplash() {
    sessionStorage.setItem("univers-splash-seen", "1");
    if (!localStorage.getItem("univers-onboarded")) setStage("onboarding");
    else if (!localStorage.getItem("univers-signed-in")) setStage("login");
    else setStage("app");
  }
  function afterOnboarding() {
    localStorage.setItem("univers-onboarded", "1");
    setStage(localStorage.getItem("univers-signed-in") ? "app" : "login");
  }
  function afterLogin() {
    localStorage.setItem("univers-signed-in", "1");
    setStage("app");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LevelProvider>
          <GeoProvider>
            <Outlet />
            {ready && stage === "splash" && <Splash onDone={afterSplash} />}
            {ready && stage === "onboarding" && <Onboarding onDone={afterOnboarding} />}
            {ready && stage === "login" && <Login onDone={afterLogin} />}
            <Toaster position="top-center" richColors />
          </GeoProvider>
        </LevelProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
