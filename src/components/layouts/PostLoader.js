import React from 'react';

const PostLoader = () => (
  <div className="container blog">
    <div className="post-wrapper">
      <a href="/" className="post-title loader-title">Post Title</a>
      <div className="loader-img" />
      <p className="post-excerpt mt-4 loader-excerpt">Post Excerpt</p>
      <a href="/" className="post-author loader-author">Post Author</a>
      <div className="post-date loader-date" />
      <div className="post-category loader-category" />
    </div>
  </div>
);

export default PostLoader;
