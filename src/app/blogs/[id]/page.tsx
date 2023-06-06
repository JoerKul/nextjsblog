import { getSession } from "@/app/api/auth/session";
import { getBlogById } from "@/app/actions/getBlogById";
import Link from "next/link";

interface IBlogParams {
  id: string;
}

async function Page({ params }: { params: IBlogParams }) {
  const session = await getSession();
  const blog = await getBlogById(params.id);
  return (
    <div>
      <h1>
        {blog?.title} - {params.id} - {blog?.id}
      </h1>
      <p>{blog?.content}</p>
      {session && session?.user?.id === blog?.user.id && (
        <div className="flex gap-2 justify-start mt-2">
          <Link
            href={`/blogs/edit/${blog?.id}`}
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Edit
          </Link>
          <button
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            // onClick={async () => {
            //   await axios.delete(`/api/blogs/${blog?.id}`);
            //   window.location.href = "/blogs";
            // }}
          >
            Delete
          </button>
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
