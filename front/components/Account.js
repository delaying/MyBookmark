import React, { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import { useRouter } from "next/router";

const Div = styled.div`
  margin-right: 10px;
  float: right;
  margin-top: 12px;
  font-size: 12px;
  color: gray;
  @media screen and (max-width: 1024px) {
    margin-right: 2%;
    margin-top: 7px;
  }
  @media screen and (max-width: 480px) {
    margin-right: 5%;
    margin-top: 7px;
  }
`;

const Logout = styled.div`
  margin-right: 160px;
  float: right;
  margin-top: 10px;
  font-size: 8px;
  color: gray;
  padding: 2px;
  width: 41px;
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  @media screen and (max-width: 1024px) {
    margin-right: 15%;
    margin-top: 5px;
  }
  @media screen and (max-width: 480px) {
    margin-right: 10%;
    margin-top: 5px;
  }
`;

function Account() {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
    router.replace("/");
  }, []);

  return (
    <>
      <Logout onClick={onLogout}>로그아웃</Logout>

      <Div>{me.email} 님의 Bookmark</Div>
    </>
  );
}

export default Account;
