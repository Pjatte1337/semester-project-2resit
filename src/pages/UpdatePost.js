import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../api/constants';
import { Modal, Button } from 'react-bootstrap';
import '../style/updatePost.css';
import '../style/Buttons.css';

const UpdatePost = ({ postId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchPost = () => {
      const wordPressSiteURL = Api.siteUrl;

      setLoading(true);
      setError(null);

      fetch(`${wordPressSiteURL}/wp-json/wp/v2/posts/${postId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((data) => {
          setTitle(data.title.rendered);
          setContent(data.content.rendered);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    fetchPost();
  }, [postId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const wordPressSiteURL = Api.siteUrl;
    const authToken = localStorage.getItem('token');

    fetch(`${wordPressSiteURL}/wp-json/wp/v2/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Post updated:', postId);
          navigate('/profile');
        } else {
          throw new Error('Failed to update post');
        }
      })
      .catch((err) => {
        console.error('Error updating post:', err);
        setError('Failed to update post. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  const removePTags = (htmlString) => {
    return htmlString.replace(/<\/?p>/g, '').replace(/<br\s?\/?>/g, '\n');
  };

  return (
    <div>
      <button className="btn-update" onClick={openModal}>
        Edit
      </button>

      {showModal && (
        <div className="modal-backdrop" onClick={handleModalClick}>
          <Modal
            show={showModal}
            onHide={closeModal}
            dialogClassName="modal-auto"
            contentClassName="modal-content"
            ref={modalRef}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    value={removePTags(content)}
                    onChange={handleContentChange}
                    disabled={loading}
                    rows="16"
                  />
                </div>
                <Button className="btn-update2" type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </Button>
                <Button className="btn-update2" onClick={closeModal} disabled={loading}>
                  Cancel
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
