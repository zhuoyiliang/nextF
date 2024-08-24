import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import SideBar_ from "./components/ui/SideBar_";
import NavHeader_ from "./components/ui/NavHeader_";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "NextJs2",
    description: "front app learning",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="h-screen min-w-[480px] max-w-[1920px] flex relative overflow-hidden">
            <div className={""}>
                <SideBar_></SideBar_>
            </div>
            <div className={"grow overflow-auto"}>
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
