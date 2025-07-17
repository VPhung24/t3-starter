import { api } from "~/trpc/server";

import { Post } from "~/app/_components/post";

export default async function Page() {
    const posts = await api.post.getAll();

    return (
        <ul className="flex flex-col gap-4 p-4">
            {posts.map((post) => (
                <li key={post.id}>
                    <Post post={post} />
                </li>
            ))}
        </ul>
    );
}
