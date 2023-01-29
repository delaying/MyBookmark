import React, { useCallback, useEffect, useState } from "react";
import useInput from "../hooks/useInput";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SuccessModal from "./SuccessModal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

const CloseButton = styled.button`
  padding: 5px;
  width: 60px;
  border-radius: 3px;
  border: 2px solid #6895dc;
`;
const SubmitButton = styled.button`
  background-color: #6895dc;
  color: white;
  padding: 5px;
  width: 60px;
  border-radius: 3px;
  border: 2px solid #6895dc;
`;

const SuccessDiv = styled.div`
  margin: 10px;
  width: 200px;
`;

function SignupModal() {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector(
    (state) => state.user
  );

  const [show, setShow] = useState(false);
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (signUpDone) {
      if (setSuccess) {
        setSuccess(false);
      }
    }
  });

  useEffect(() => {
    if (signUpError) {
      if (setSuccess) {
        setSuccess(false);
      }
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
      if (setSuccess) {
        setSuccess(false);
      }
    },
    [password, passwordCheck]
  );

  const handleSubmit = useCallback(
    (e) => {
      // if (password !== passwordCheck) {
      //   return setPasswordError(true);
      // }
      setShow(false);
      setSuccess(true);

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          password,
        },
      });
      setEmail("");
      setPassword("");
    },
    [email, password]
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="none" onClick={handleShow}>
        회원가입
      </Button>

      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="user-email"
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={email}
                onChange={onChangeEmail}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="user-password"
                type="password"
                placeholder="8자 이상 입력"
                value={password}
                onChange={onChangePassword}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea2"
            >
              <Form.Label>Password Check</Form.Label>
              <Form.Control
                name="user-password-check"
                type="password"
                placeholder="비밀번호 재입력"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              {passwordError && (
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CloseButton variant="secondary" onClick={handleClose}>
            Close
          </CloseButton>
          <SubmitButton variant="primary" onClick={handleSubmit}>
            Signup
          </SubmitButton>
        </Modal.Footer>
      </Modal>
      <SuccessDiv>{success && <SuccessModal />}</SuccessDiv>
    </>
  );
}
export default SignupModal;
