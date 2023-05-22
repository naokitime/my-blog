import React, { useEffect, useState } from "react";
import "./createPst.css";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [postText, setPostText] = useState();

  const createPost = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      title: title,
      postText: postText,
      createdAt: new Date(),
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  };

  const handleKeyDown = (e) => {
    // Command + Enter on Mac, Ctrl + Enter on Windows/Linux
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      createPost(e);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を登録する</h1>
        <form onSubmit={createPost}>
          <div className="inputPost">
            <div>タイトル</div>
            <input
              type="text"
              placeholder="タイトルを記入"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputPost">
            <div>投稿</div>
            <textarea
              placeholder="投稿内容を記入"
              onChange={(e) => setPostText(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
            <button className="postButton" type="submit">
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
