import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";
import { LevelProvider } from "@/lib/level";
import Splash from "@/components/Splash";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0061FF" },
      { title: "Univers — Discover Your Future" },
      { name: "description", content: "Univers is your intelligent education companion to discover schools and universities worldwide." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/jpeg", href: "/favicon.jpg" },
      { rel: "shortcut icon", href: "/favicon.jpg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.jpg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("univers-splash-seen")) {
      setShowSplash(false);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LevelProvider>
          {showSplash && <Splash onDone={() => { sessionStorage.setItem("univers-splash-seen","1"); setShowSplash(false); }} />}
          <Outlet />
          <Toaster position="top-center" richColors />
        </LevelProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
