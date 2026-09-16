import { Header } from "@/components/platform/layout/header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink antialiased">
      <Header />
      <main>{children}</main>
    </div>
  );
}