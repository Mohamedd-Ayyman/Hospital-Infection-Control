"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:4000/api/user/get-logged-in",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };

    fetchUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isDashboard = pathname?.startsWith("/dashboard");

  // Navigation links based on role
  const getNavLinks = () => {
    if (!user) {
      return [
        { href: "/", label: "HOME" },
        { href: "/standard-operating-procedures", label: "SOPs" },
        { href: "/challenges", label: "CHALLENGES" },
        { href: "/about", label: "ABOUT" },
        { href: "/login", label: "LOGIN", highlight: true },
      ];
    }

    const commonLinks = [
      { href: "/dashboard", label: "DASHBOARD" },
      { href: "/dashboard/policies", label: "POLICIES" },
      { href: "/standard-operating-procedures", label: "SOPs" },
      { href: "/challenges", label: "CHALLENGES" },
    ];

    if (user.role === "Admin") {
      return [
        ...commonLinks,
        { href: "/dashboard/users", label: "USERS" },
        { href: "/dashboard/audits", label: "AUDITS" },
        { href: "/dashboard/reports", label: "REPORTS" },
      ];
    }

    if (user.role === "Doctor" || user.role === "Nurse") {
      return [
        ...commonLinks,
        { href: "/dashboard/reports", label: "REPORT INFECTION" },
      ];
    }

    return commonLinks;
  };

  // Hide navbar on auth pages
  if (isAuthPage) {
    return <>{children}</>;
  }

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen">
      <nav className="bg-black w-full flex relative justify-between items-center mx-auto px-8 h-20 text-sm md:text-base sticky top-0 z-50 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🏥</span>
          {user && (
            <div className="hidden md:block">
              <p className="text-white text-xs opacity-70">Welcome back</p>
              <p className="text-teal-400 font-semibold">{user.firstname}</p>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative cursor-pointer whitespace-nowrap inline-block py-2 px-4 rounded-full transition-all ${
                link.highlight
                  ? "bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold"
                  : pathname === link.href
                  ? "bg-teal-500 text-white"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-2 py-2 px-4 bg-red-500 bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-all border border-red-400 border-opacity-30"
            >
              LOGOUT
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="absolute top-20 left-0 right-0 bg-black border-b border-gray-800 md:hidden">
            <div className="flex flex-col p-4 space-y-2">
              {user && (
                <div className="pb-4 border-b border-gray-800 mb-2">
                  <p className="text-white text-sm opacity-70">Logged in as</p>
                  <p className="text-teal-400 font-semibold">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-white text-xs opacity-50">
                    {user.role} • {user.department}
                  </p>
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-4 rounded-lg transition-all ${
                    link.highlight
                      ? "bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold"
                      : pathname === link.href
                      ? "bg-teal-500 text-white"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="py-3 px-4 bg-red-500 bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all border border-red-400 border-opacity-30"
                >
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {children}
    </div>
  );
}
