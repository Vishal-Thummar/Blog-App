import React, { useEffect, useState } from "react";
import { Container, PostCard, Loader } from "../components";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userName);

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    }

    appwriteService
      .getPosts(false, [], userData.$id)
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        if (posts.documents.length === 0) {
          setLoading(true);
          //   // Filter out inactive posts
          const activePosts = posts.documents.filter((post) => post.active);
          setPosts(activePosts);
        }
      })
      .finally(() => setLoading(false));
  }, [userData]);
  //   useEffect(() => {
  //     appwriteService.getPosts(false, [], userData.$id).then((posts) => {
  //       if (posts) {
  //         setPosts(posts.documents);
  //       }
  //       console.log(posts);
  //     });
  //   }, []);

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold mb-4">
          Please{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Login
          </Link>{" "}
          Or{" "}
          <Link className="text-blue-500 hover:underline" to="/signup">
            Signup
          </Link>{" "}
          to view posts.
        </p>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full py-8 mt-24">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mt-8"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
