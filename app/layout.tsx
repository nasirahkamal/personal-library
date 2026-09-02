import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My Library",
    template: "%s | My Library",
  },
  description:
    "A personal library tracker built with Next.js, TypeScript, Prisma and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900">
        <header className="border-b border-stone-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/books"
              className="text-xl font-bold tracking-tight"
            >
              My Library
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/books"
                className="text-sm text-stone-600 hover:text-stone-950"
              >
                Books
              </Link>

              <Link
                href="/books/new"
                className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
              >
                Add Book
              </Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="mt-12 border-t border-stone-200 py-6 text-center text-sm text-stone-500">
          Built with Next.js, TypeScript, Prisma and PostgreSQL
        </footer>
      </body>
    </html>
  );
}