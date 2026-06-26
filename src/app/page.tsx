"use client";

import { RouterProvider, useRouter } from "@/artemis/router";
import { Layout } from "@/artemis/components/Layout";
import { Home } from "@/artemis/pages/Home";
import { Manifesto } from "@/artemis/pages/Manifesto";
import { Approach } from "@/artemis/pages/Approach";

import { Programs } from "@/artemis/pages/Programs";
import { ProgramDetail } from "@/artemis/pages/ProgramDetail";
import { Ventures } from "@/artemis/pages/Ventures";
import { VentureDetail } from "@/artemis/pages/VentureDetail";
import { RoutesPage } from "@/artemis/pages/RoutesPage";
import { Insights } from "@/artemis/pages/Insights";
import { InsightDetail } from "@/artemis/pages/InsightDetail";
import { Capital } from "@/artemis/pages/Capital";
import { JoinPage } from "@/artemis/pages/JoinPage";
import { CareersPage } from "@/artemis/pages/CareersPage";
import { Team } from "@/artemis/pages/Team";
import { CaseStudies } from "@/artemis/pages/CaseStudies";
import { Community } from "@/artemis/pages/Community";
import { TownSquare } from "@/artemis/pages/TownSquare";
import { About } from "@/artemis/pages/About";
import { InvestorDashboard } from "@/artemis/pages/InvestorDashboard";
import { AdminDashboard } from "@/artemis/pages/AdminDashboard";
import { Infrastructure } from "@/artemis/pages/Infrastructure";

function Router() {
  const { path } = useRouter();

  // Route matching
  const renderPage = () => {
    if (path === "/" || path === "") return <Home />;
    if (path === "/manifesto") return <Manifesto />;
    if (path === "/approach") return <Approach />;

    if (path === "/programs") return <Programs />;
    if (path.startsWith("/programs/")) return <ProgramDetail />;
    if (path === "/ventures") return <Ventures />;
    if (path.startsWith("/ventures/")) return <VentureDetail />;
    if (path === "/routes") return <RoutesPage />;
    if (path === "/insights") return <Insights />;
    if (path.startsWith("/insights/")) return <InsightDetail />;
    if (path === "/capital") return <Capital />;
    if (path === "/join") return <JoinPage />;
    if (path === "/careers") return <CareersPage />;
    if (path === "/team") return <Team />;
    if (path === "/case-studies") return <CaseStudies />;
    if (path === "/dashboard") return <InvestorDashboard />;
    if (path === "/community") return <Community />;
    if (path === "/townsquare") return <TownSquare />;
    if (path === "/about") return <About />;
    if (path === "/infrastructure") return <Infrastructure />;
    if (path === "/admin") return <AdminDashboard />;
    // 404 fallback — branded dark experience
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0A0A0A] text-white px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-2.5 mb-10">
            <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center rounded-lg">
              <span className="text-white font-bold text-[12px]">X</span>
            </div>
            <span className="text-[13px] font-bold tracking-tight uppercase">xCelero<span className="text-[#FF4D00]"> Labs</span></span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#FF4D00] mb-4">Error 404</p>
          <h1 className="text-[64px] md:text-[96px] font-display font-medium leading-none tracking-tighter mb-6">
            Lost on<br /><span className="text-[#FF4D00]">the Route.</span>
          </h1>
          <p className="text-white/40 text-[15px] font-medium leading-[1.6] mb-10 max-w-sm mx-auto">
            This page doesn&apos;t exist or has been moved. Let&aposs get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="#/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] text-white text-[11px] font-bold tracking-[0.05em] rounded-full hover:bg-[#FF6A28] transition-colors"
            >
              Return Home
            </a>
            <a
              href="#/ventures"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-[11px] font-bold tracking-[0.05em] rounded-full hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              View Ventures
            </a>
          </div>
        </div>
      </div>
    );
  };

  return <Layout>{renderPage()}</Layout>;
}

export default function ArtemisApp() {
  return (
    <RouterProvider>
      <Router />
    </RouterProvider>
  );
}
