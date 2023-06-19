import React, { useState } from "react";
import clientConfig from "../../../client-config";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const DeletePost = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDeletePost = () => {
    setLoading(true);

    const wordPressSiteUrl = clientConfig.siteUrl;
    const authToken = localStorage.getItem("token");

    axios
      .delete(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        // Redirect to dashboard after successful deletion
        window.location.href = "/dashboard/posts";
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    handleDeletePost();
    handleCloseModal();
  };

  return (
    <div>
      <Button
        className="btn btn-secondary float-right read-more-btn"
        type="button"
        variant="danger"
        onClick={handleShowModal}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeletePost;
