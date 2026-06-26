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
import { CapitalAlt1 } from "@/artemis/pages/CapitalAlt1";
import { CapitalAlt2 } from "@/artemis/pages/CapitalAlt2";
import { CapitalAlt3 } from "@/artemis/pages/CapitalAlt3";
import { ApproachAlt1 } from "@/artemis/pages/ApproachAlt1";
import { ApproachAlt2 } from "@/artemis/pages/ApproachAlt2";
import { ApproachAlt3 } from "@/artemis/pages/ApproachAlt3";
import { InfrastructureAlt1 } from "@/artemis/pages/InfrastructureAlt1";
import { InfrastructureAlt2 } from "@/artemis/pages/InfrastructureAlt2";
import { InfrastructureAlt3 } from "@/artemis/pages/InfrastructureAlt3";

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
    if (path === "/capital-alt-1") return <CapitalAlt1 />;
    if (path === "/capital-alt-2") return <CapitalAlt2 />;
    if (path === "/capital-alt-3") return <CapitalAlt3 />;
    if (path === "/approach-alt-1") return <ApproachAlt1 />;
    if (path === "/approach-alt-2") return <ApproachAlt2 />;
    if (path === "/approach-alt-3") return <ApproachAlt3 />;
    if (path === "/infrastructure-alt-1") return <InfrastructureAlt1 />;
    if (path === "/infrastructure-alt-2") return <InfrastructureAlt2 />;
    if (path === "/infrastructure-alt-3") return <InfrastructureAlt3 />;
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
    // 404 fallback
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white text-[#111111]">
        <div className="max-w-xl mx-auto text-center px-6 py-24">
          <p className="font-mono text-[10px] tracking-[0.4em] text-[#FF4D00] mb-6">404</p>
          <h1 className="text-[80px] md:text-[120px] font-display font-medium leading-none tracking-tighter mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-4">Page Not Found</h2>
          <p className="text-[#111111]/50 font-medium leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#FF4D00] transition-colors"
            >
              Return Home
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 text-[11px] lowercase tracking-[0.1em] font-medium">
            <a href="#/insights" className="text-[#111111]/40 hover:text-[#FF4D00] transition-colors">
              Back to Insights
            </a>
            <span className="text-[#111111]/20">|</span>
            <a href="#/ventures" className="text-[#111111]/40 hover:text-[#FF4D00] transition-colors">
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
