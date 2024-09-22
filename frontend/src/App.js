import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/posts/";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    // Fetch all blog posts on load
    axios.get(API_URL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  // Create a new blog post
  const handleCreatePost = async () => {
    const newPost = { title, content, author };
    await axios.post(API_URL, newPost);
    setTitle("");
    setContent("");
    setAuthor("");
    fetchPosts();
  };

  // Fetch all posts again
  const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    setPosts(response.data);
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    await axios.delete(`${API_URL}${postId}`);
    fetchPosts(); // Refresh the posts list
  };

  // Populate the form fields for editing
  const handleEditPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setEditPostId(post._id);
    setIsEditing(true);
  };

  // Update a post
  const handleUpdatePost = async () => {
    const updatedPost = { title, content, author };
    await axios.put(`${API_URL}${editPostId}`, updatedPost);
    setTitle("");
    setContent("");
    setAuthor("");
    setIsEditing(false);
    setEditPostId(null);
    fetchPosts(); // Refresh the posts list
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

        {isEditing ? (
          <button onClick={handleUpdatePost}>Update Post</button>
        ) : (
          <button onClick={handleCreatePost}>Create Post</button>
        )}
      </div>

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>
            <b>Author:</b> {post.author}
          </p>
          <button onClick={() => handleEditPost(post)}>Edit</button>
          <button onClick={() => handleDeletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
