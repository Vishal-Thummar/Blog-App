import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block mb-8">
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-48 object-cover object-center"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
