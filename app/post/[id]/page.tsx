import Navbar from "@/app/_components/navbar";
import PostCard from "@/app/_components/post-card";
import { findOnePost } from "@/lib/actions/findposts";


type Params = {
    params: {
        id: string
    }
};

export default async function PostPage({ params }: Params) {
    const post = await findOnePost(params.id);
    return(
        <>
            <Navbar />
            <PostCard 
                time={post?.created_at}
                title={post?.title}
                content={post?.content}
                username={post?.user.username}
                handle={post?.user.username}
                key={post?.id}
            />
        </>
    );
}