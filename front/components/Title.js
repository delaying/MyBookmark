import React, { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useSelector } from "react-redux";

const Head = styled.h1`
  width: 70%;
  font-size: calc(1.375rem + 1.5vw);
  position: absolute;
  left: 45%;
  margin-top: 70px;
  color: black;
  @media screen and (max-width: 1024px) {
    left: 37%;
    margin-top: 50px;
  }
  @media screen and (max-width: 480px) {
    margin-top: -172px;
    left: 25%;
  }
`;

function Title() {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <Link href={`/`}>
        <a>
          <Head>My Bookmark</Head>
        </a>
      </Link>
    </>
  );
}

export default Title;
