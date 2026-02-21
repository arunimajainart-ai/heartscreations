"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { ImageIcon, FileText, LayoutDashboard, LogOut, ArrowLeft, Database } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  // Login page doesn't need admin layout chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/artworks", label: "Artworks", icon: ImageIcon },
    { href: "/admin/blogs", label: "Blogs", icon: FileText },
    { href: "/admin/seed", label: "Seed Data", icon: Database },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <h1
                style={{ fontFamily: "var(--font-cormorant), serif" }}
                className="text-lg sm:text-xl font-medium text-gray-900 tracking-wider truncate max-w-[130px] sm:max-w-none"
              >
                HEARTS CREATIONS
              </h1>
              <span className="text-[10px] sm:text-xs bg-gray-900 text-white px-1.5 py-0.5 rounded tracking-wide font-medium relative top-[-1px]">
                ADMIN
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link
                href="/"
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Site</span>
                <span className="sm:hidden">Site</span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 border-l border-gray-200">
                <span className="hidden md:block text-sm text-gray-600 font-medium">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <nav className="w-full md:w-56 shrink-0 relative">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200 p-1.5 flex flex-row overflow-x-auto md:flex-col gap-1 sm:gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:py-3 rounded-lg text-sm sm:text-[15px] font-medium transition-all whitespace-nowrap ${isActive
                        ? "bg-gray-900 text-white shadow-md"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            {/* Soft fade for horizontal scroll hint */}
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none rounded-r-xl" />
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
