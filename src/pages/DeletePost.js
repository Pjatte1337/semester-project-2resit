import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/constants";
import { Modal } from "react-bootstrap";
import "../style/DeletePost.css";

const DeletePost = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDeletePost = () => {
    setLoading(true);

    const wordPressSiteUrl = Api.siteUrl;
    const authToken = localStorage.getItem("token");

    fetch(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(() => {
        console.log("Post deleted:", postId);
        navigate("/profile");
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
    <>
      <div>
        <button
          className="btn-delete"
          onClick={handleShowModal}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>

        {showModal && (
          <div className="modal-backdrop" onClick={handleCloseModal} />
        )}

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="custom-modal"
          centered
        >
          <Modal.Dialog className="delete-modal-dialog">
            <Modal.Header className="delete-modal-header">
              <Modal.Title className="delete-modal-title">Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className="delete-modal-body">Are you sure you want to delete this post?</Modal.Body>
            <Modal.Footer className="delete-modal-footer">
              <button
                className="btn-delete-confirm"
                variant="danger"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="btn-delete-cancel"
                variant="secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
};

export default DeletePost;
