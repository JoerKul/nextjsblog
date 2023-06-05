"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function Page() {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await axios
      .post("/api/user/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/");
        }, 2500);
      })
      .catch((err: any) => {
        console.log("Register Page ", err);
      })
      .finally(() => {});
  };

  function handleChange(event: any) {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  return (
    <form onSubmit={onSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <h1 className="text-2xl">Register</h1>
        <p className="text-sm">Create your account</p>
        <hr />
        <input
          className="text-black"
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
          placeholder="Name"
        />
        <input
          className="text-black"
          type="email"
          name="email"
          onChange={handleChange}
          value={state.email}
          placeholder="Email"
        />
        <input
          className="text-black"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
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
