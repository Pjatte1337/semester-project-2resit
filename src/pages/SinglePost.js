// Import React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

// Import Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import Styles
import "../style/SinglePost.css";
import "../style/GlobalStyle.css";

// Import Loader
import Loader from "../assets/loader/loader.gif";

const Post = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const wordPressSiteUrl = "https://www.joakimvanebo.info";

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
          <>
            <h1 className="title">{post.title.rendered}</h1>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></div>
            <div className="post-footer">
              <Moment format="MMMM Do, YYYY">{post.date}</Moment>
            </div>
          </>
        ) : (
          <div>{!loading && <div>Loading...</div>}</div>
        )}
      </div>
      {loading && <img className="loader" src={Loader} alt="Loader" />}
      <Footer />
    </div>
  );
};

export default Post;
