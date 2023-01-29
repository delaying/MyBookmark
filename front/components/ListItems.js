import { CHANGE_FOLDER_REQUEST, REMOVE_FOLDER_REQUEST } from "../reducers/post";
import React, { useCallback, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { MdOutlineAutoFixNormal } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/router";
import css from "../styles/folder.module.css";

const IconSpan = styled.span`
  margin-left: 30px;
`;
const FixInput = styled.input`
  width: 60px;
  height: 18px;
  margin: 0 0 0 -62px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`;

const ListItems = ({ post }) => {
  const dispatch = useDispatch();
  const [subfolder, setSubfolder] = useState(false);
  const [folderOption, setFolderOption] = useState(false);
  const [fix, setFix] = useState(false);
  const { me } = useSelector((state) => state.user);
  const [content, onChangeContent] = useInput(post?.content || "");
  const [selected, onChangeSelected, setSelected] = useInput(false);

  const router = useRouter();

  const folderid = router.query.id;

  useEffect(() => {
    if (post.id == folderid) {
      setSelected(true);
    } else if (post.id != folderid) {
      setSelected(false);
    } else if (!folderid) {
      setSelected(false);
    }
  }, [post.id, folderid]);

  const onRemoveFolder = useCallback(() => {
    confirmAlert({
      title: "폴더를 삭제하시겠습니까?",
      message: "하위 목록과 사이트가 전부 삭제됩니다.",
      buttons: [
        {
          label: "삭제",
          onClick: () =>
            dispatch({
              type: REMOVE_FOLDER_REQUEST,
              data: post.id,
            }),
        },
        {
          label: "취소",
        },
      ],
    });
  }, []);

  const onChangeFolderName = useCallback(
    (e) => {
      e.preventDefault();
      console.log(content);
      setFix(!fix);
      dispatch({
        type: CHANGE_FOLDER_REQUEST,
        data: {
          FolderId: post.id,
          content: content,
        },
      });
    },
    [post, content]
  );

  return (
    <>
      <Link href={`/folder/${post.id}`} prefetch={false}>
        <a>
          <li
            className={selected ? `${css.selectedList}` : `${css.List}`}
            onClick={() => {
              setSubfolder(!subfolder);
            }}
            onMouseEnter={() => {
              setFolderOption(true);
            }}
            onMouseLeave={() => {
              setFolderOption(false);
            }}
          >
            <span>{post.content}</span>
            {folderOption && (
              <>
                <IconSpan>
                  <span>
                    {fix ? (
                      <>
                        <form onSubmit={onChangeFolderName}>
                          <FixInput
                            value={content}
                            onChange={onChangeContent}
                          />
                          <MdOutlineAutoFixNormal
                            onClick={() => {
                              setFix(!fix);
                            }}
                          />
                        </form>
                      </>
                    ) : (
                      <MdOutlineAutoFixNormal
                        onClick={() => {
                          setFix(!fix);
                        }}
                      />
                    )}

                    <BiTrash onClick={onRemoveFolder} />
                  </span>
                </IconSpan>
              </>
            )}
          </li>
        </a>
      </Link>
    </>
  );
};

export default ListItems;
