import { notFound } from "next/navigation";
import { Post } from "~/app/_components/post";
import { api } from "~/trpc/server";

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const post = await api.post.getById({ id: Number.parseInt(slug) });

    if (!post) {
        notFound();
    }

    return (
        <Post post={post} showFull />
    );
}
