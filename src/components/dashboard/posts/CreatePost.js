import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Loader from "../../../assets/loader/loader.gif";
import clientConfig from "../../../client-config";
import axios from "axios";

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

    const wordPressSiteUrl = clientConfig.siteUrl;
    const authToken = localStorage.getItem("token");

    axios
      .post(`${wordPressSiteUrl}/wp-json/wp/v2/posts`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setPostCreated(!!res.data.id);
        setMessage(res.data.id ? "New post created" : "");
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response.data.message);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
      setTitleError(""); // Clear the title error when the user types
    } else if (name === "content") {
      setContent(value);
      setContentError(""); // Clear the content error when the user types
    }
  };

  return (
    <DashboardLayout>
      <form
        onSubmit={handleFormSubmit}
        className="mt-5"
        style={{ maxWidth: "800px" }}
      >
        <legend className="mb-4">Create Post</legend>

        {message ? (
          <div
            className={`alert ${postCreated ? "alert-success" : "alert-danger"}`}
            dangerouslySetInnerHTML={createMarkup(message)}
          />
        ) : (
          ""
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
          {titleError && <div className="text-danger">{titleError}</div>}
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
          {contentError && <div className="text-danger">{contentError}</div>}
        </div>

        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
        {loading && <img className="loader" src={Loader} alt="Loader" />}
      </form>
    </DashboardLayout>
  );
};

export default CreatePost;
