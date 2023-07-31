import { createBlogAction } from "@/app/actions/createBlogAction";
import { getSession } from "@/app/api/auth/session";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

interface InitialStateProps {
  title: string;
  content: string;
}

const initialState: InitialStateProps = {
  title: "",
  content: "",
};

async function handleSubmit(formData: FormData) {
  "use server";

  const session = await getSession();

  await createBlogAction({
    userId: session?.user?.id as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });
  revalidatePath("/blogs/create");
  redirect("/blogs");
}

function Page() {
  return (
    <div className="flex flex-col justify-center mx-auto gap-2">
      <h1>Blog Create</h1>

      <form action={handleSubmit} method="post" className="text-center">
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="text-black"
            type="text"
            id="title"
            name="title"
            defaultValue={initialState.title}
          />
          <textarea
            className="text-black h-[200px]"
            typeof="text"
            id="content"
            name="content"
            defaultValue={initialState.content}
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
