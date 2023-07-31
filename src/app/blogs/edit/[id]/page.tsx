import { getBlogByIdAction } from "@/app/actions/getBlogByIdAction";
import { updateBlog } from "@/app/actions/updateBlog";
import { getSession } from "@/app/api/auth/session";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function handleSubmit(formData: FormData) {
  "use server";

  const session = await getSession();

  await updateBlog({
    blogId: formData.get("blogId") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });
  revalidatePath("/blogs/edit");
  redirect("/blogs");
}

interface IBlogParams {
  id: string;
}

async function Page({ params }: { params: IBlogParams }) {
  const blog = await getBlogByIdAction(params.id);

  return (
    <div className="flex flex-col justify-center mx-auto gap-2">
      <h1>Blog Edit</h1>

      <form action={handleSubmit} method="post" className="text-center">
        <input type="hidden" name="blogId" value={blog?.id} />
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="text-black"
            type="text"
            id="title"
            name="title"
            defaultValue={blog?.title}
          />
          <textarea
            className="text-black h-[200px]"
            typeof="text"
            id="content"
            name="content"
            defaultValue={blog?.content}
          />
          <div className="flex gap-2 justify-center">
            <Link
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
              href="/blogs"
            >
              Cancel
            </Link>
            <button
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
