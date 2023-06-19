import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import "./style/SinglePost.css"
import "./style/GlobalStyle.css"


const Post = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const wordPressSiteUrl = "https://pjatte1337.no";
    console.log(id); // Log the value of id
    axios
      .get(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      {error && <div className="alert alert-danger">{error}</div>}
      {post && Object.keys(post).length ? (
        <div className="mt-5 post-container">
          {/* Title */}
          <div className="card-header">{post.title.rendered}</div>
          {/* Body */}
          <div className="card-body">
            <div
              className="card-text post-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></div>
          </div>
          {/* Footer */}
          <div className="card-footer">
            <Moment fromNow>{post.date}</Moment>
          </div>
        </div>
      ) : (
        <div>{!loading && <div>Loading...</div>}</div>
      )}
       <Footer /> 
    </div>
  );
};

export default Post;
