import React, { useCallback, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import useInput from "../hooks/useInput";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SITE_REQUEST,
  CHANGE_SUBFOLDER_REQUEST,
  REMOVE_SUBFOLDER_REQUEST,
} from "../reducers/post";
import { BiTrash } from "react-icons/bi";
import { MdOutlineAutoFixNormal } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
  width: 80px;
  border-radius: 3px;
  border: 2px solid #6895dc;
`;

const IconSpan = styled.span`
  color: gray;
  margin-left: 30px;
  &:hover {
    cursor: pointer;
  }
`;
const ListInput = styled.input`
  width: 70px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-left: -50px;
`;

function SiteModal({ subfolder, subid, folid }) {
  const { mainPosts } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const [listname, onChangeListname] = useInput(subfolder || "");

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [link, onChangeLink, setLink] = useInput("");
  const [explain, onChangeExplain, setExplain] = useInput("");
  const [list, onChangeList, setList] = useInput("");
  const [listState, onChangeListState, setListState] = useInput(false);

  const handleClose = (e) => {
    setShow(false);
    onChangeEmail("");
  };

  const handleSubmit = useCallback(
    (e) => {
      setShow(false);
      dispatch({
        type: ADD_SITE_REQUEST,
        data: {
          link: link,
          explain: explain,
          folderId: parseInt(folid),
          subfolderId: parseInt(subid),
          userId: id,
        },
      });
      setLink("");
      setExplain("");
    },
    [link, explain]
  );

  const handleShow = () => setShow(true);

  const onRemoveList = useCallback(() => {
    confirmAlert({
      title: "목록을 삭제하시겠습니까?",
      message: "목록에 등록된 사이트가 전부 삭제됩니다.",
      buttons: [
        {
          label: "삭제",
          onClick: () =>
            dispatch({
              type: REMOVE_SUBFOLDER_REQUEST,
              data: subid,
            }),
        },
        {
          label: "취소",
        },
      ],
    });
  }, []);

  const onUpdateList = useCallback(
    (e) => {
      e.preventDefault();
      console.log(folid, subid, listname);
      dispatch({
        type: CHANGE_SUBFOLDER_REQUEST,
        data: {
          FolderId: parseInt(folid),
          SubfolderId: subid,
          listname: listname,
        },
      });
      setListState(!listState);
    },
    [folid, subid, listname]
  );

  return (
    <>
      <IconSpan>
        {listState ? (
          <>
            <form onSubmit={onUpdateList}>
              <ListInput value={listname} onChange={onChangeListname} />
              <MdOutlineAutoFixNormal
                onClick={() => {
                  setListState(!listState);
                }}
              />
            </form>
          </>
        ) : (
          <MdOutlineAutoFixNormal
            onClick={() => {
              setListState(!listState);
            }}
          />
        )}

        <BiTrash onClick={onRemoveList} />
      </IconSpan>
      <Button variant="none" onClick={handleShow}>
        <FiPlusSquare /> 새 사이트
      </Button>

      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>New site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="email"
                placeholder="예시) https://www.naver.com"
                autoFocus
                value={link}
                onChange={onChangeLink}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Explain</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={explain}
                onChange={onChangeExplain}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CloseButton variant="secondary" onClick={handleClose}>
            Close
          </CloseButton>
          <SubmitButton variant="primary" onClick={handleSubmit}>
            Add site
          </SubmitButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SiteModal;
