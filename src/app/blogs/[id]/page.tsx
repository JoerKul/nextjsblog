import { getSession } from "@/app/api/auth/session";
//import { useSession } from "next-auth/react";
import { getBlogByIdAction } from "../../actions/getBlogByIdAction";
import Link from "next/link";
import { deleteBlogByIdAction } from "@/app/actions/deleteBlogByIdAction";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function handleSubmit(formData: FormData) {
  "use server";

  const session = await getSession();

  await deleteBlogByIdAction(formData.get("id") as string);
  revalidatePath("/blogs");
  redirect("/blogs");
}
interface IBlogParams {
  id: string;
}

async function Page({ params }: { params: IBlogParams }) {
  //const { data: session, status } = useSession();
  const session = await getSession();
  const blog = await getBlogByIdAction(params.id);
  return (
    <div>
      <h1>
        {blog?.title} - {params.id} - {blog?.id}
      </h1>
      <p>{blog?.content}</p>
      {session && session?.user?.id === blog?.userId && (
        <div className="flex gap-2 justify-start mt-2">
          <Link
            href={`/blogs/edit/${blog?.id}`}
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Edit
          </Link>
          <form action={handleSubmit} method="POST">
            <input type="hidden" name="id" value={blog?.id} />
            <button
              type="submit"
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Delete
            </button>
          </form>
        </div>
      )}
      <div className="mt-3">
        <Link href="/blogs" className="underline  underline-offset-2">
          Back to Blogs
        </Link>
      </div>
      {session && (
        <div className="mt-6">
          <p>User: {JSON.stringify(session?.user?.name)}</p>
          <p>EMail: {JSON.stringify(session?.user?.email)}</p>
          <p>User ID: {JSON.stringify(session?.user?.id)}</p>
          <p>BeaerToken: {JSON.stringify(session?.user?.bearerToken)}</p>
        </div>
      )}
    </div>
  );
}

export default Page;
