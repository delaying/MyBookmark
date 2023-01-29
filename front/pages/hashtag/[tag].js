//hashtag/[tag].js -> 동적 라우팅

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import styled from "styled-components";
import InitPage from "../../components/InitPage";

import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_HASHTAGS_SITES_REQUEST } from "../../reducers/post";
import wrapper from "../../store/configureStore";
import axios from "axios";
import HashtagList from "../../components/HashtagList";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: 22%;
  top: 160px;
  width: 70%;
  @media screen and (max-width: 480px) {
    left: 4%;
    top: -10px;
    width: 95%;
  }
`;

const Hashtag = () => {
  const router = useRouter();
  const id = useSelector((state) => state.user.me?.id);
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (!id) {
      router.replace("/");
    }
    if (!router.isReady) {
      return;
    }
    if (!state) {
      dispatch({
        type: LOAD_HASHTAGS_SITES_REQUEST,
        data: tag,
      });
      setState(true);
    }
  }, [router.isReady]);

  const tag = router.query.tag;

  return (
    <>
      <AppLayout />
      <Frame>{id ? <HashtagList data={mainPosts} /> : <InitPage />}</Frame>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log(context);
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Hashtag;
