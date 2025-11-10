import { Header } from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-background px-4 sm:px-6">{children}</div>
    </div>
  );
}
