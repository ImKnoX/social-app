import { 
  ProfileButton,
  LoginButton,
  LogoutButton,
  RegisterButton,
} from "./_components/auth-buttons.components";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import NavBar from "./_components/navbar";
import FormPost from "./_components/form-post";
import PostCard from "./_components/post-card";
import { findAllPost } from "@/lib/actions/findposts";
import { useOptimistic } from "react";

export const dynamic = `auto`,
dynamicParams = true,
revalidate = 0,
fetchCache = 'auto',
runtime = 'nodejs',
preferredRegion = 'auto'

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if(!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl font-semibold text-gray-800">You are not logged in</p>
          <p className="mt-2 text-gray-600">Please sign in to continue.</p>
          <Link href={'/api/auth/signin'}>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const posts = await findAllPost();

  return(
    <main >
      <div>
      <NavBar />
        <FormPost />
       {posts.map((post) => {
        return (
          <Link key={post.id} href={`/post/${post.id}`}>
             <PostCard 
                handle={post.user.username?.toLocaleLowerCase()} 
                content={post.title}
                time={post.created_at}
                title={post.title}
                username={post.user.username}
                key={post.id}
        />
          </Link>
        )
       })}
        
      </div>
    </main> 
  );
};