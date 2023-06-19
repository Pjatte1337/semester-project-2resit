import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import Loader from '../assets/loader/loader.gif';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import clientConfig from '../client-config';
import './style/GlobalStyle.css';
import './style/Navbar.css';
import './style/Home.css';
import './style/Footer.css';
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const wordPressSiteURL = clientConfig.siteUrl;

    setLoading(true);
    setError('');

    axios
      .get(`${wordPressSiteURL}/wp-json/wp/v2/posts/`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            setPosts(res.data);
          } else {
            setError('No Posts Found');
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
    if (searchQuery.trim() === '') {
      return posts;
    }

    const filteredPosts = posts.filter((post) =>
      post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredPosts;
  };

  const filteredPosts = filterPosts();


  return (
    <>
      <Navbar />
      {error && (
        <div
          className="alert alert-danger"
          dangerouslySetInnerHTML={{ __html: error }}
        />
      )}
      <div className="centered-heading">
        <h1>Semester Project</h1>
      </div>
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
              style={{ maxWidth: '50rem' }}
            >
              <div className="card-header">
                <Link
                  to={`/post/${post.id}`}
                  className="text-secondary font-weight-bold"
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
                  className="btn btn-secondary float-right read-more-btn"
                  style={{ textDecoration: 'none', marginRight: '10px' }}
                >
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {loading && <img className="loader" src={Loader} alt="Loader" />}
      <Footer />
    </>
  );
};

export default Home;
