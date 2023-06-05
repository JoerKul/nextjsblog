"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};
