import React, { useCallback, useState } from "react";
import useInput from "../hooks/useInput";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function SuccessModal() {
  const [show, setShow] = useState(true);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-relative"
      style={{ minHeight: "240px" }}
    >
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">My Bookmark</strong>
        </Toast.Header>
        <Toast.Body>회원가입 완료!</Toast.Body>
      </Toast>
    </div>
  );
}
export default SuccessModal;
