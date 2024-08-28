'use client';

import { createPost } from "@/lib/actions/formpost";

const FormPost = () => {
    return(
        <div className="max-w-md mx-auto mt-10">
            <form 
            className="bg-white p-4 rounded-lg shadow-md"
            action={createPost}
            >
                <div>
                    <label htmlFor="title">Title</label>
                </div>
                <input 
                type="text" 
                name="title" 
                className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Foo and Bar"
                id="title"
                required 
                />
                <div>
                    <label htmlFor="content">Content</label>
                </div>
                <textarea 
                    className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="content" 
                    id="content" 
                    placeholder="What are you thinking..."
                >
                </textarea>
                <div className="flex justify-between items-center mt-3">
                    <button 
                     type="submit"
                     className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
                     >
                        Post
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default FormPost;