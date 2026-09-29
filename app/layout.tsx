import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "فنجان قهوة مع أبوغزالة", description: "منصة محمد رفعت أبوغزالة للمقالات والفيديوهات والقضايا السياسية والاقتصادية.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ar" dir="rtl"><body>{children}</body></html>; }
