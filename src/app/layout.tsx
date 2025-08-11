import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App/app-sidebar";
import Header from "@/components/App/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Token Generator",
    description: "Generate Token for Developer",
    generator: "Next.js",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <Header />
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}
