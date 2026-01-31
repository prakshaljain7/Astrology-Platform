"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { KundaliDataProvider } from "@/context/KundaliDataContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const { themeColors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen aurora-bg flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: themeColors.brand.accent, borderTopColor: 'transparent' }}
          />
          <p style={{ color: themeColors.text.secondary }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <KundaliDataProvider>
      <div className="min-h-screen aurora-bg">
        <Sidebar />
        <main className="ml-64 min-h-screen">
          {children}
        </main>
      </div>
    </KundaliDataProvider>
  );
}
