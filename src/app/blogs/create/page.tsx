"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface InitialStateProps {
  title: string;
  content: string;
}

const initialState: InitialStateProps = {
  title: "",
  content: "",
};

function Page() {
  const [inputValue, setInputValue] = useState(initialState);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await axios.post("/api/blogs/create", inputValue).then(
      () => {
        router.push("/blogs");
      },
      (error) => {
        console.log("Error from Client Page", error);
      }
    );
    console.log(response);
  };

  const handleInputChange = (event: any) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex flex-col justify-center mx-auto gap-2">
      <h1>Blog Create</h1>

      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="text-center"
      >
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="text-black"
            type="text"
            id="title"
            name="title"
            value={inputValue.title}
            onChange={handleInputChange}
          />
          <textarea
            className="text-black h-[200px]"
            typeof="text"
            id="content"
            name="content"
            value={inputValue.content}
            onChange={handleInputChange}
          />
          <button
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
