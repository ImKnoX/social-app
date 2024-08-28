'use client';

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useOptimistic } from "react";

type Props = {
    username: string;
    handle: string;
    time: Date;
    title: string;
    content?: string
}

const PostCard = ({
    username,
    handle,
    time,
    title,
    content
}: Props) => {
  const [optimisticState, updateOptimisticState] = useOptimistic(
    { title, content },
    (prev, next) => ({ ...prev, ...next })
  );

  const handleTitleChange = (newTitle: string) => {
    updateOptimisticState({ title: newTitle });
    // Trigger the actual update here, e.g., an API call
  };

  const handleContentChange = (newContent: string) => {
      updateOptimisticState({ content: newContent });
      // Trigger the actual update here, e.g., an API call
  };

    return(
        <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start">
        <div className="ml-4 w-full">
          <div className="flex items-center">
            <h2 className="font-semibold text-gray-900">{username}</h2>
            <span className="text-gray-500 ml-2">@{handle}</span>
            <span className="text-gray-500 mx-2">·</span>
            <span className="text-gray-500">{time.toLocaleDateString()}</span>
          </div>
          <h3 className="mt-2 text-xl font-bold text-gray-900">{optimisticState.title}</h3>
          <p className="mt-2 text-gray-800">{optimisticState.content}</p>
         {/**
          * 
          *  <div className="flex justify-between mt-3 text-gray-500">
            <button className="hover:text-blue-500">
              <i className="fas fa-comment"></i> 12
            </button>
            <button className="hover:text-green-500">
              <i className="fas fa-retweet"></i> 5
            </button>
            <button className="hover:text-red-500">
              <i className="fas fa-heart"></i> 32
            </button>
            <button className="hover:text-gray-700">
              <i className="fas fa-share"></i>
            </button>
          </div>
          */}
        </div>
      </div>
    </div>
    )
}

export default PostCard;