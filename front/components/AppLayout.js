import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { END } from "redux-saga";
import Login from "../components/Login";
import Folder from "./Folder";
import Title from "./Title";
import { useSelector, useDispatch } from "react-redux";
import Account from "./Account";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_FOLDERS_REQUEST } from "../reducers/post";
import wrapper from "../store/configureStore";
import axios from "axios";

const AppLayout = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  return (
    <>
      {id ? <Account /> : <Login />}
      {id ? <Folder /> : <></>}

      <Title />
    </>
  );
};

// AppLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log("getServerSideProps start");
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log("getServerSideProps end");
    await context.store.sagaTask.toPromise();
  }
);

export default AppLayout;
