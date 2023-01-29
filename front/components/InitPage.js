import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import init from "../img/init1.png";
import img12 from "../img/12.png";
import img122 from "../img/122.png";
import img13 from "../img/13.png";
import img14 from "../img/14.png";
import img142 from "../img/142.png";
import img15 from "../img/15.png";
import img22 from "../img/22.png";
import img23 from "../img/23.png";
import img31 from "../img/31.png";
import img32 from "../img/32.png";
import img33 from "../img/33.png";
import img332 from "../img/332.png";
import img34 from "../img/34.png";
import img342 from "../img/342.png";
import img35 from "../img/35.png";
import img352 from "../img/352.png";
import img36 from "../img/36.png";
import signup from "../img/signup.png";
import Link from "next/link";
import { BsArrowUpSquare } from "react-icons/bs";

const ImgDiv = styled.div`
  width: 50p;
`;

const UpIcon = styled.div`
  width: 40px;
  position: fixed;
  right: 15%;
  bottom: 30px;
  color: gray;
  @media screen and (max-width: 1024px) {
    right: 20px;
  }
`;

// 로그인 안했을때와 데이터가 하나도 없을 경우 InitPage 출력

const InitPage = () => {
  return (
    <>
      <h3 id="main">My Bookmark 사용법</h3>
      <ul>
        <a href="#1">
          <li>사이트 저장하기</li>
        </a>
        <a href="#2">
          <li>사이트 검색하기</li>
        </a>
        <a href="#3">
          <li>수정 및 삭제하기</li>
        </a>
      </ul>

      <h5 id="1">1. 사이트를 저장 후 쉽게 찾고 이동하세요!</h5>
      <p>1-1 양식에 맞춰 회원가입 후 로그인해주세요.</p>
      <ImgDiv>
        <Image src={signup} alt="home" />
      </ImgDiv>
      <p>1-2 새 폴더를 만들어 주세요.</p>
      <ImgDiv>
        <Image src={img12} alt="home" />
        <Image src={img122} alt="home" />
      </ImgDiv>
      <p>1-3 원하는 폴더안에 목록을 만들어 주세요.</p>
      <ImgDiv>
        <Image src={img13} alt="home" />
      </ImgDiv>
      <p>
        1-4 원하는 목록안에 저장하고 싶은 링크와 키워드 및 설명을 작성합니다.
      </p>
      <ImgDiv>
        <Image src={img14} alt="home" />
        <Image src={img142} alt="home" />
      </ImgDiv>
      <p>1-5 링크를 클릭하면 새탭으로 링크가 열리게 됩니다.</p>
      <ImgDiv>
        <Image src={img15} alt="home" />
      </ImgDiv>

      <h5 id="2">
        2. 키워드를 검색하여 쉽고, 빠르게 원하는 사이트를 찾으세요!
      </h5>
      <p>
        2-1 로그인 후 사이트를 추가할 때 # 기호 뒤에 알기쉬운 키워드를
        입력하세요.
      </p>
      <ImgDiv>
        <Image src={img142} alt="home" />
      </ImgDiv>
      <p>2-2 로그인 후 찾고싶은 키워드를 검색하세요.</p>
      <ImgDiv>
        <Image src={img22} alt="home" />
      </ImgDiv>
      <p>
        2-3 파란색으로 뜨는 키워드를 클릭하면 그 키워드를 가진 모든 사이트가
        검색됩니다.
      </p>
      <ImgDiv>
        <Image src={img23} alt="home" />
      </ImgDiv>

      <h5 id="3">3. 수정 및 삭제를 통해 폴더와 사이트들을 정리해요!</h5>
      <p>
        3-1 폴더 이름을 바꾸고 싶을땐 아래 버튼을 클릭한 후 바꾸고 싶은 이름으로
        변경하면돼요.
      </p>
      <ImgDiv>
        <Image src={img31} alt="home" />
      </ImgDiv>
      <p>
        3-2 목록 이름을 바꾸고 싶을땐 아래 버튼을 클릭한 후 바꾸고 싶은 이름으로
        변경하면돼요.
      </p>
      <ImgDiv>
        <Image src={img32} alt="home" />
      </ImgDiv>
      <p>
        3-3 사이트 링크나 설명을 바꾸고 싶을땐 아래 버튼을 클릭한 후 바꾸고 싶은
        사이트로 변경하면돼요.
      </p>
      <ImgDiv>
        <Image src={img33} alt="home" />
        <Image src={img332} alt="home" />
      </ImgDiv>
      <p>
        3-4 폴더를 삭제하고 싶을땐 휴지통 버튼을 누르고 주의 알림창을 읽고
        확인을 누르면 삭제돼요.
      </p>
      <ImgDiv>
        <Image src={img34} alt="home" />
      </ImgDiv>
      <ImgDiv>
        <Image src={img342} alt="home" />
      </ImgDiv>
      <p>
        3-5 목록을 삭제하고 싶을땐 휴지통 버튼을 누르고 주의 알림창을 읽고
        확인을 누르면 삭제돼요.
      </p>
      <ImgDiv>
        <Image src={img35} alt="home" />
      </ImgDiv>
      <ImgDiv>
        <Image src={img352} alt="home" />
      </ImgDiv>
      <p>3-6 사이트를 삭제하고 싶을땐 아래와 같은 버튼을 누르면 삭제돼요.</p>
      <ImgDiv>
        <Image src={img33} alt="home" />
        <Image src={img36} alt="home" />
      </ImgDiv>

      <a href="#main">
        <UpIcon>
          <BsArrowUpSquare color="gray" fontSize="1.5em" />
        </UpIcon>
      </a>
    </>
  );
};

export default InitPage;
