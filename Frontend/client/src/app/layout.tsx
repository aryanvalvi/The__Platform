import type {Metadata} from "next"
import {Poppins} from "next/font/google"
import Providers from "./provider"
import Navbar from "@/components/Navbar"
import AuthInitilizer from "@/components/protectedRoutes/AuthInitilizer"
import LoginPopup from "@/components/login/LoginPopup"
import "./globals.css"
import Script from "next/script"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "UIUXYN",
  description: "uiuxyn",
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        <Providers>
          <AuthInitilizer>
            <div>
              <LoginPopup />
              <Navbar />
              <main className={poppins.className}>{children}</main>
            </div>
          </AuthInitilizer>
        </Providers>
      </body>
    </html>
  )
}
