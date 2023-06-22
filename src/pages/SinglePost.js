import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import "../style/SinglePost.css";
import "../style/GlobalStyle.css";
import "../style/Footer.css";

const Post = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const wordPressSiteUrl = "https://www.joakimvanebo.info";
    console.log(id); // Log the value of id

    fetch(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="main-container">
      <Navbar />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="post-container">
        {post && Object.keys(post).length ? (
          <React.Fragment>
            {/* Title */}
            <h1 className="title">{post.title.rendered}</h1>
            {/* Body */}
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></div>
            {/* Footer */}
            <div className="post-footer">
              <Moment format="MMMM Do, YYYY">{post.date}</Moment>
            </div>
          </React.Fragment>
        ) : (
          <div>{!loading && <div>Loading...</div>}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Post;
