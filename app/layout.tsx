"use client";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <html lang="ko" data-theme={theme === "light" ? "light" : undefined}>
      <body>
        <div className="animated-bg" />
        <header>
          <nav className="container">
            <div className="logo">AI Security Guard</div>
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/signup">Sign Up</Link></li>
            </ul>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}


