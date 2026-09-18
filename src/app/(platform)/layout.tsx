import { Header } from "@/components/platform/layout/header";
import { BottomNav } from "@/components/platform/layout/bottom-nav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink antialiased">
      <Header />
      <main className="pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
