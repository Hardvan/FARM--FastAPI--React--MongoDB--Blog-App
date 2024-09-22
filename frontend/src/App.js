import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/posts/";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    // Fetch all blog posts on load
    axios.get(API_URL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleCreatePost = async () => {
    const newPost = { title, content, author };
    await axios.post(API_URL, newPost);
    setTitle("");
    setContent("");
    setAuthor("");
    // Reload posts
    const response = await axios.get(API_URL);
    setPosts(response.data);
  };

  return (
    <div>
      <h1>Blog App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>
            <b>Author:</b> {post.author}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
