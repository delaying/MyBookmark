import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import css from "../styles/folder.module.css";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { FiFolderPlus } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import Image from "next/image";
import cloud from "../img/folder.svg";
import useInput from "../hooks/useInput";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_FOLDER_REQUEST,
  ADD_SUBFOLDER_REQUEST,
  REMOVE_FOLDER_REQUEST,
} from "../reducers/post";
import ListItems from "./ListItems";
import { useRouter } from "next/router";

const Div = styled.div`
  margin-top: 20px;
  margin-right: 30px;
  position: fixed;
  left: 6%;
  top: 120px;
  color: gray;
  @media screen and (max-width: 1024px) {
    left: 3%;
    margin-right: 30px;
  }
  @media screen and (max-width: 480px) {
    position: static;
  }
`;

const LoginErrorDiv = styled.div`
  position: fixed;
  left: 7%;
  bottom: 110px;
  color: red;
  @media screen and (max-width: 1024px) {
    left: 3%;
  }
`;

const Folderdiv = styled.div`
  &:hover {
    color: #797fbc;
    transition: 0.5s;
    cursor: pointer;
  }
`;
const NewFolderDiv = styled.div`
  position: fixed;
  left: 7.3%;
  bottom: 125px;
`;

const FolderInput = styled.input`
  width: 100px;
  padding: 2px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  text-align: center;
  margin-right: 5px;
`;

const CloseIcon = styled.div`
  display: inline;
`;

const FolderUl = styled.ul`
  overflow-y: auto;
  height: 280px;
  @media screen and (max-width: 480px) {
    overflow-x: auto;
    height: 120px;
    margin-top: 50px;
    margin-left: 20px;
    border-bottom: 1.5px solid #d9d9d9;
  }
`;

function Folder() {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = useSelector((state) => state.user.me?.id);
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const [folderState, setFolderState] = useState(false);
  const [folderLogin, setFolderLogin] = useState(false);

  const [folder, onChangeFolder, setFolder] = useInput("");
  const [tag, onChangeTag, setTag] = useInput("");

  const newFolderState = () => {
    if (me == null) {
      setFolderLogin(true);
    } else {
      if (folderLogin) {
        setFolderLogin(false);
        setFolderState(!folderState);
      } else {
        setFolderState(!folderState);
      }
    }
  };

  const folderSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // setFolder("");
      setFolderState(!folderState);
      console.log(folder);
      dispatch({
        type: ADD_FOLDER_REQUEST,
        data: { content: folder },
      });
      setFolder("");
    },
    [folder]
  );

  const tagSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(tag);
      router.push(`/hashtag/${tag}`);
      setTag("");
    },
    [tag]
  );

  return (
    <>
      <Div>
        <div className={css.icon}>
          <form onSubmit={tagSubmit}>
            <input placeholder="태그 검색" value={tag} onChange={onChangeTag} />
            <button type="submit">
              <BiSearch color="gray" fontSize="1.2em" />
            </button>
          </form>
        </div>
        <FolderUl>
          {me?.Folders.map((post) => (
            <ListItems key={post.id} post={post} />
          ))}
        </FolderUl>

        <div className={css.img}>
          <Image src={cloud} alt="home" />
        </div>
        <div className={css.line}></div>
        <Folderdiv className={css.folderIcon} onClick={newFolderState}>
          <FiFolderPlus />
          &nbsp; &nbsp; 새 폴더
        </Folderdiv>
      </Div>
      {folderLogin && (
        <>
          <LoginErrorDiv>로그인이 필요합니다.</LoginErrorDiv>
        </>
      )}
      {folderState && (
        <>
          <NewFolderDiv>
            <form onSubmit={folderSubmit}>
              <FolderInput
                placeholder="새 폴더 이름"
                value={folder}
                onChange={onChangeFolder}
              />
              <CloseIcon
                onClick={() => {
                  setFolderState(!folderState);
                }}
              >
                <IoMdClose color="gray" fontSize="1em" />
              </CloseIcon>
            </form>
          </NewFolderDiv>
        </>
      )}
    </>
  );
}

export default Folder;
