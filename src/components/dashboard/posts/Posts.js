import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import clientConfig from "../../../client-config";
import Loader from "../../../assets/loader/loader.gif";
import DeletePost from "../posts/DeletePost";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const wordPressSiteURL = clientConfig.siteUrl;

    setLoading(true);
    setError("");

    axios
      .get(`${wordPressSiteURL}/wp-json/wp/v2/posts/`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            setPosts(res.data);
          } else {
            setError("No Posts Found");
          }
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterPosts = () => {
    if (searchQuery.trim() === "") {
      return posts; // If search query is empty, return all posts
    }

    const filteredPosts = posts.filter((post) =>
      post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredPosts;
  };

  const filteredPosts = filterPosts();

  return (
    <DashboardLayout>
      {error && (
        <div className="alert alert-danger" dangerouslySetInnerHTML={{ __html: error }} />
      )}
      <div className="search-container mt-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {filteredPosts.length ? (
        <div className="mt-5 posts-container">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="card border-dark mb-3"
              style={{ maxWidth: "50rem" }}
            >
              <div className="card-header">
                <Link
                  to={`/post/${post.id}`}
                  className="text-secondary font-weight-bold"
                  style={{ textDecoration: "none" }}
                >
                  {post.title.rendered}
                </Link>
              </div>
              <div className="card-body">
                <div
                  className="card-text post-content"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
              <div className="card-footer">
                <Moment fromNow>{post.date}</Moment>
                <Link
                  to={`/post/${post.id}`}
                  className="btn btn-secondary float-right"
                  style={{ textDecoration: "none" }}
                >
                  Read More...
                </Link>
                <DeletePost postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
            {loading && <img className="loader" src={Loader} alt="Loader" />}
    </DashboardLayout>
  );
};

export default Posts;
