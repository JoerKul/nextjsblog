import { getBlogs } from "@/db";
import Link from "next/link";

async function Page() {
  const blogs = await getBlogs();

  return (
    <div>
      <h1>Blog Page</h1>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <div className="flex flex-col container">
              <Link
                href={`/blogs/${blog.id}`}
                className="border rounded-md border-slate-300 hover:border-slate-600 hover:bg-slate-700 p-2 my-4"
              >
                <h2 className="font-bold uppercase">{blog.title}</h2>
                <p>{blog.content}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
