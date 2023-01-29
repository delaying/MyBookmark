import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Content from "./Content";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { ADD_SUBFOLDER_REQUEST } from "../reducers/post";
import { IoMdClose } from "react-icons/io";

import useInput from "../hooks/useInput";
import { Subfolder } from "../../back/models";
import SiteModal from "./SiteModal";
import HashtagContent from "./HashtagContent";

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1em;
  font-weight: bold;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function HashtagList({ data }) {
  return (
    <>
      <Head>
        {data.map((sub) => (
          <ContentDiv>
            <HashtagContent key={sub.id} data={sub} />
          </ContentDiv>
        ))}
      </Head>
    </>
  );
}
export default HashtagList;
