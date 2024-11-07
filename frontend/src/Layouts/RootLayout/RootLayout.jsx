import React from "react";
import "./RootLayout.css";
import { Link, Outlet } from "react-router-dom";
import logo from "../../../Public/images/logo-neural-feed.png";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();
const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="root">
          <header>
            <Link to="/" className="logo">
              <img src={logo} alt="" />
              <span>Neural Feed AI</span>
            </Link>
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
