import { LoginButton, LogoutButton } from "@/app/api/auth/auth";
import { getSession } from "@/app/api/auth/session";

export const Nav = async () => {
  const session = await getSession();

  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>

        {!session && <LoginButton />}
        {session && (
          <div className="flex gap-3 items-center">
            <p className="text-slate-300">Signed in as {session?.user?.name}</p>
            <LogoutButton />
          </div>
        )}
      </header>
    </div>
  );
};
