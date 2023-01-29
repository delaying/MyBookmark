//페이지들의 공통적인것 처리가능
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "../styles/global.css";
import wrapper from "../store/configureStore";

function MyBookmark({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>MyBookmark</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <Component />
    </>
  );
}

MyBookmark.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
// export function reportWebVitals(metric) {
//   console.log(metric);
// }

export default wrapper.withRedux(MyBookmark);
