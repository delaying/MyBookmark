import React, { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useSelector } from "react-redux";

const ContentTag = ({ siteData }) => {
  return (
    <>
      {siteData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link
              href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
              prefetch={false}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </>
  );
};

export default ContentTag;
