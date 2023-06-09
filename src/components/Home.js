import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Home.css";

const Home = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
  };

  return (
    <div>
      <div className="homePage">
        {postList.map((post) => {
          return (
            <div className="postContents" key={post.id}>
              <div className="postHeader">
                <h1>{post.title}</h1>
              </div>
              <div className="postTextContainer">{post.postText}</div>
              <div className="nameAndDeleteButton">
                <h3>@{post.author.username}</h3>
                {post.author.id === auth.currentUser?.uid && (
                  <button onClick={() => handleDelete(post.id)}>削除</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
