import React, { useState, useEffect } from 'react';
import clientConfig from '../../client-config';
import Post from '../layouts/Post';
import Pagination from '../layouts/Pagination';
import PostLoader from '../layouts/PostLoader';

export const Posts = (props) => {
  const pageId = parseInt(props.pageId);

  const [currentPage, setCurrentPage] = useState(pageId);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errMessage, setError] = useState('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const wordPressSiteURL = clientConfig.siteUrl;

    setLoading(true);

    fetch(`${wordPressSiteURL}/wp-json/rae/v1/posts?page_no=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.status === 200) {
          setPosts(data.posts_data);
          setTotalPages(data.page_count);
        } else {
          setError('No posts found');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [currentPage]);

  const getPosts = (posts) => {
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  return (
    <>
      {loading && <PostLoader />}
      <div className="container-blog" style={{ overflow: 'hidden' }}>
        {!loading && null !== posts && posts.length ? (
          <>
            {getPosts(posts)}
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </>
        ) : (
          <div>{errMessage}</div>
        )}
      </div>
    </>
  );
};

export default Posts;
