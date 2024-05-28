import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function AllPosts() {
  const userData = useSelector((state) => state.auth.userName);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts(true, [], userData.$id).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [userData.$id]); // Added userData.$id as dependency for useEffect

  return (
    <div className="w-full py-8 mt-24">
      <Container>
        <div className="flex flex-wrap -mx-4">
          {" "}
          {/* Adjusted flex-wrap and added negative margin for gutter */}
          {posts.map((post) => (
            <div
              key={post.$id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mt-8"
            >
              {" "}
              {/* Adjusted width and added margin */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
