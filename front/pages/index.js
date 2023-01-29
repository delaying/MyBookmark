import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InitPage from "../components/InitPage";

import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: 300px;
  top: 160px;
  width: 70%;
  @media screen and (max-width: 1024px) {
    left: 25%;
  }
  @media screen and (max-width: 780px) {
    left: 10%;
  }
  @media screen and (max-width: 480px) {
    top: 10px;
    width: 100%;
  }
`;

const Home = () => {
  const id = useSelector((state) => state.user.me?.id);
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <AppLayout />
      <Frame>
        <InitPage />
      </Frame>
    </>
  );
};

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

export default Home;
