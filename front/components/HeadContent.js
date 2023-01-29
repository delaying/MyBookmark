import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Content from "./Content";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { ADD_SUBFOLDER_REQUEST } from "../reducers/post";
import { IoMdClose } from "react-icons/io";

import useInput from "../hooks/useInput";
import SiteModal from "./SiteModal";

const Head = styled.div`
  font-size: 1em;
  font-weight: bold;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;

const FolderInput = styled.input`
  width: 100px;
  padding: 2px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  text-align: center;
`;

const LoginErrorDiv = styled.div`
  position: fixed;
  left: 22%;
  top: 220px;
  color: red;
`;
const CloseIcon = styled.div`
  display: inline;
`;

const Listdiv = styled.div`
  color: gray;
  &:hover {
    color: #797fbc;
    transition: 0.5s;
    cursor: pointer;
  }
`;

function HeadContent({ data, folderid }) {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);
  const [subfoldervalue, onChangeSubfoldervalue, setSubfoldervalue] =
    useInput("");
  const [folderState, setFolderState] = useState(false);
  const [folderLogin, setFolderLogin] = useState(false);

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

  const createSubfolder = useCallback(
    (e) => {
      // e.preventDefault();
      e.stopPropagation();
      // console.log(mainPosts[0].id);
      setFolderState(!folderState);

      dispatch({
        type: ADD_SUBFOLDER_REQUEST,
        data: {
          subfolder: subfoldervalue,
          folderId: parseInt(folderid),
          userId: id,
        },
      });
      setSubfoldervalue("");
    },
    [subfoldervalue, id]
  );

  return (
    <>
      {data.map((sub) => (
        <Head>
          {sub.FolderId == folderid ? (
            <>
              <span>{sub?.subfolder}</span>
              <SiteModal
                key={sub.id}
                subfolder={sub.subfolder}
                subid={sub.id}
                folid={folderid}
              />

              <ContentDiv>
                {me?.Sites.map((site) => (
                  <Content key={site.id} subid={sub.id} site={site} />
                ))}
              </ContentDiv>
            </>
          ) : (
            <></>
          )}
        </Head>
      ))}

      {folderLogin && (
        <>
          <LoginErrorDiv>로그인이 필요합니다.</LoginErrorDiv>
        </>
      )}
      {folderState ? (
        <>
          <div>
            <form onSubmit={createSubfolder}>
              <FolderInput
                placeholder="새 목록 이름"
                value={subfoldervalue}
                onChange={onChangeSubfoldervalue}
              />

              <CloseIcon
                onClick={() => {
                  setFolderState(!folderState);
                }}
              >
                <IoMdClose color="gray" fontSize="1em" />
              </CloseIcon>
            </form>
          </div>
        </>
      ) : (
        <Listdiv onClick={newFolderState}>
          <HiOutlineViewGridAdd /> 새 목록
        </Listdiv>
      )}
    </>
  );
}
export default HeadContent;
