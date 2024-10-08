import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ModeToggle } from "@/components/ui/togglemode";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI FlashCard App",
  description: "A SaaS Tool that let you generate flashcards by giving prompt.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
              <div className="container flex h-16 items-center justify-between">
                <h4 className="text-2xl font-bold">AI Flash</h4>
                <div className="flex items-center gap-4">
                  <ModeToggle />
                  <SignedOut>
                    <div className="flex gap-4">
                      <Button variant="ghost" asChild>
                        <a href="/sign-in">Login</a>
                      </Button>
                      <Button asChild>
                        <a href="/sign-up">Sign up</a>
                      </Button>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </header>

            {/* Main content */}
            <main>{children}
              <Analytics />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
