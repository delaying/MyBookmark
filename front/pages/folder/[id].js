//folder/[id].js -> 동적 라우팅

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import styled from "styled-components";
import HeadContent from "../../components/HeadContent";
import InitPage from "../../components/InitPage";

import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { LOAD_FOLDERS_REQUEST } from "../../reducers/post";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: 22%;
  top: 160px;
  width: 80%;
  @media screen and (max-width: 1200px) {
    left: 22%;
    top: 100px;
    width: 90%;
  }
  @media screen and (max-width: 480px) {
    left: 5%;
    top: -15px;
    width: 90%;
  }
`;

const Folder = () => {
  const router = useRouter();
  const id = useSelector((state) => state.user.me?.id);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!id) {
      router.replace("/");
    }
    if (!router.isReady) {
      return;
    }
  }, [router.isReady]);

  const folderid = router.query.id;

  return (
    <>
      <AppLayout />
      <Frame>
        {id ? (
          <HeadContent
            key={folderid}
            data={me.Subfolders}
            folderid={folderid}
          />
        ) : (
          <InitPage />
        )}
      </Frame>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    // context.store.dispatch({
    //   type: LOAD_FOLDERS_REQUEST,
    //   data: context.params.id,
    // });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Folder;
