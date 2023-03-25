import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, updatePost } from "../redux/postsSlice";

export default function Posts() {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const posts = useSelector((state) => state.posts.items);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="form">
        <input
          type="text"
          value={title}
          placeholder="Enter Post Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Enter Post Desc"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={() => {
            if (title !== "" && description !== "") {
              dispatch(addPost({ id: posts.length + 1, title, description }));
              setTitle("");
              setDescription("");
            } else {
              window.prompt("fill all requirments");
            }
          }}
        >
          Add Post
        </button>
      </div>
      <div className="posts">
        {posts.length > 0
          ? posts.map((post) => (
              <div className="post" key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setId(post.id);
                  }}
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    dispatch(deletePost({ id: post.id }));
                  }}
                >
                  Delete
                </button>
                <br />
                {isEdit && id == post.id && (
                  <>
                    <input
                      type="text"
                      placeholder="update title"
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="update description"
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        dispatch(
                          updatePost({
                            id: post.id,
                            title: updatedTitle,
                            description: updatedDescription,
                          })
                        );
                        setIsEdit(false);
                      }}
                    >
                      Update
                    </button>
                  </>
                )}
              </div>
            ))
          : "there are no posts to show "}
      </div>
    </div>
  );
}
