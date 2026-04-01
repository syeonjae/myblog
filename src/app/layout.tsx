import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import FloatingRadialMenu from "@/components/ui/FloatingRadialMenu";
import SiteSidebar from "@/components/common/SiteSidebar";
import SiteFooter from "@/components/common/SiteFooter";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col text-zinc-100">
        <StarfieldBackground />

        <main className="relative z-10 w-full flex-1 px-4 pt-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-8">
            <SiteSidebar />
            <div className="min-w-0 pb-10">{children}</div>
          </div>
        </main>

        <div className="relative z-10 w-full px-4 pb-6 sm:px-6 lg:px-8">
          <SiteFooter />
        </div>

        <FloatingRadialMenu />
      </body>
    </html>
  );
}
