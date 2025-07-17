"use client";

import Link from "next/link";
import type { RouterOutputs } from "~/trpc/react";

type Post = RouterOutputs["post"]["getById"]

interface PostProps {
	post: Post
	showFull?: boolean
}

export function Post({ post, showFull = false }: PostProps) {
	if (!post) return null

	return <div className="flex flex-col gap-4 p-4">
		<Link className="font-bold text-2xl" href={`/blog/${post.id}`}>{post.name}</Link>
		<p className="text-gray-500 text-sm">{showFull && post.createdAt.toLocaleDateString()}</p>
	</div>
}