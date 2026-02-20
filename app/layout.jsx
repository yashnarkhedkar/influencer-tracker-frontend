import { Epilogue, Syne } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-epilogue"
});
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne"
});

export const metadata = {
  title: "Influencer Campaign Tracker",
  description: "Plan, manage, and track influencer campaigns end-to-end."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${syne.variable} font-sans`}>
        <QueryProvider>
          <ToastProvider>
            <div className="relative min-h-screen bg-bg text-text">
              <div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />
                <div className="absolute -right-40 -top-48 h-[640px] w-[640px] rounded-full bg-cyan/10 blur-[120px]" />
                <div className="absolute -left-40 bottom-[-220px] h-[560px] w-[560px] rounded-full bg-violet/10 blur-[120px]" />
                <div className="absolute left-[35%] top-[40%] h-[420px] w-[420px] rounded-full bg-rose/10 blur-[140px]" />
              </div>
              {children}
            </div>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
