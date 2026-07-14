import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { DashboardLayout } from "@/components/DashboardLayout";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const HistoryPage = lazy(() => import("@/pages/HistoryPage"));
const ArchitecturePage = lazy(() => import("@/pages/ArchitecturePage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 rounded-full border-2 border-brand-400/30 border-t-brand-400 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<DashboardLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="history"
          element={
            <Suspense fallback={<PageFallback />}>
              <HistoryPage />
            </Suspense>
          }
        />
        <Route
          path="architecture"
          element={
            <Suspense fallback={<PageFallback />}>
              <ArchitecturePage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageFallback />}>
              <SettingsPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
