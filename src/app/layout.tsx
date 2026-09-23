import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/layout/Header";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { CartDrawer } from "@/components/food/CartDrawer";
import { CheckoutModal } from "@/components/food/CheckoutModal";
import { RestaurantMenuModal } from "@/components/food/RestaurantMenuModal";
import { StoryDetailModal } from "@/components/jira/StoryDetailModal";
import { NewStoryModal } from "@/components/jira/NewStoryModal";

export const metadata: Metadata = {
  title: "Online Food Ordering SOA System & Jira Agile Platform",
  description: "Enterprise Service-Oriented Architecture (S1-S5) with complete Jira Agile Scrum Management & Interactive Lab Suite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-orange-500 selection:text-white font-sans">
        <ToastProvider>
          <AppProvider>
            <Header />
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
            <NotificationCenter />
            <CartDrawer />
            <CheckoutModal />
            <RestaurantMenuModal />
            <StoryDetailModal />
            <NewStoryModal />
          </AppProvider>
        </ToastProvider>
      </body>
    </html>
  );
}