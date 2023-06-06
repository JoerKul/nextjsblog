import Link from "next/link";
import { registerUser } from "../../actions/registerUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

async function onSubmit(formData: FormData) {
  "use server";

  await registerUser({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  revalidatePath("/register");
  redirect("/");
}

export default function Page() {
  return (
    <form action={onSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <h1 className="text-2xl">Register</h1>
        <p className="text-sm">Create your account</p>
        <hr />
        <input
          className="text-black"
          type="text"
          name="name"
          defaultValue={initialState.name}
          placeholder="Name"
        />
        <input
          className="text-black"
          type="email"
          name="email"
          defaultValue={initialState.email}
          placeholder="Email"
        />
        <input
          className="text-black"
          type="password"
          name="password"
          defaultValue={initialState.password}
          placeholder="Password"
        />

        <button
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          type="submit"
        >
          Submit
        </button>
      </div>

      <div>
        <div>
          Do you have an account ? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </form>
  );
}
