"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";

type BlogItemProps = {
  userId: string;
  blogId: string;
  title: string;
  content: string;
  deleteBlog: (id: string) => void;
};

export function BlogItem({
  userId,
  blogId,
  title,
  content,
  deleteBlog,
}: BlogItemProps) {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1 className="font-bold uppercase">{title}</h1>
      <p>{content}</p>
      {session && session.user.id == userId && (
        <div className="flex gap-2 justify-start mt-2">
          <Link
            href={`/blogs/edit/${blogId}`}
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Edit
          </Link>
          <button
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            onClick={() => deleteBlog(blogId)}
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
    </div>
  );
}
