import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartSheet } from "@/components/cart/CartSheet";
import { SearchSheet } from "@/components/layout/SearchSheet";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-3 text-lg font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-1 text-sm text-muted-foreground">A página que você procura não existe ou foi movida.</p>
        <div className="mt-6">
          <Link to="/" className="btn-cta inline-flex h-10 items-center px-5 text-sm font-semibold">Ir para o início</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Achadinhos Brasil — Achados Premium de Health & Beauty" },
      { name: "description", content: "Curadoria premium de produtos de health & beauty. Compra segura, seleção curada, entrega com acompanhamento." },
      { name: "author", content: "Achadinhos Brasil" },
      { property: "og:title", content: "Achadinhos Brasil" },
      { property: "og:description", content: "Achados premium para sua rotina de beleza." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#FAFAFC" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onSearchOpen={() => setSearchOpen(true)} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <MobileBottomNav />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <SearchSheet open={searchOpen} onOpenChange={setSearchOpen} />
      <Toaster position="top-center" richColors />
    </>
  );
}
