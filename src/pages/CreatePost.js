// Import React
import React, { useState } from "react";

// Import components
import Api from "../api/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import Styles
import "../style/CreatePost.css";
import "../style/Buttons.css";

// Import loader
import Loader from "../assets/loader/loader.gif";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postCreated, setPostCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const createMarkup = (data) => ({
    __html: data,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (title.length < 5) {
      setTitleError("Title must be at least 5 characters long.");
      return;
    }

    if (content.length < 10) {
      setContentError("Content must be at least 10 characters long.");
      return;
    }

    setLoading(true);

    const formData = {
      title: title,
      content: content,
      status: "publish",
    };

    const wordPressSiteUrl = Api.siteUrl;
    const authToken = localStorage.getItem("token");

    fetch(`${wordPressSiteUrl}/wp-json/wp/v2/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPostCreated(!!data.id);
        setMessage(data.id ? "New post created" : "");
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.message);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
      setTitleError("");
    } else if (name === "content") {
      setContent(value);
      setContentError("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="card create-post-card">
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <legend className="create-post-title">Create Post</legend>

            {message && (
              <div
                className={`alert ${
                  postCreated ? "alert-success" : "alert-danger"
                }`}
                dangerouslySetInnerHTML={createMarkup(message)}
              />
            )}

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                className="form-control"
                id="title"
              />
              {titleError && <div className="error-message">{titleError}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="my-post-content">Content</label>
              <textarea
                name="content"
                value={content}
                onChange={handleInputChange}
                className="form-control"
                id="my-post-content"
                rows="10"
              />
              {contentError && (
                <div className="error-message">{contentError}</div>
              )}
            </div>

            <button type="submit" className="btn-create">
              Submit
            </button>
            {loading && <img className="loader" src={Loader} alt="Loader" />}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
