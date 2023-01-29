import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import SignupModal from "./SignupModal";
import { useSelector, useDispatch } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const LoginDiv = styled.div`
  margin-right: -30px;
  margin-top: 5px;
  @media screen and (max-width: 1024px) {
    margin-right: -10%;
    margin-top: 5px;
  }
  @media screen and (max-width: 480px) {
    margin-right: -30%;
    margin-top: 5px;
  }
`;

const SignupDiv = styled.div`
  margin-right: 20px;
  float: right;
  margin-top: 2.8px;
  margin-left: -10px;
`;

const Div = styled.div`
  font-size: 12px;
  margin-top: 10px;
  margin-right: 5px;
  float: right;
`;

const Input = styled.input`
  margin-top: -10px;
  width: 70px;
  height: 12px;
  border-bottom: 1px solid #e2e2e2;
  font-size: 8px;
`;

function Login() {
  const dispatch = useDispatch();
  const { logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequestAction({ email, password }));
    },
    [email, password]
  );

  // const onCheckEnter = useCallback((e) => {
  //   if (e.key === "Enter") {
  //     onSubmitForm();
  //   }
  // }, []);

  return (
    <LoginDiv>
      {/* <ImageDiv>
        <Image src={bg} alt="background" />
      </ImageDiv> */}
      <SignupDiv>
        <SignupModal />
      </SignupDiv>
      {/* onKeyPress={onCheckEnter} */}
      <form onSubmit={onSubmitForm}>
        <Div>
          <button type="submit">로그인</button>{" "}
        </Div>

        <Div>
          <Input
            type="password"
            value={password}
            onChange={onChangePassword}
            tabIndex="2"
            required
            placeholder="Password"
          ></Input>
        </Div>
        <Div>
          <Input
            type="email"
            value={email}
            onChange={onChangeEmail}
            tabIndex="1"
            required
            placeholder="Email"
          ></Input>
        </Div>
      </form>
    </LoginDiv>
  );
}

export default Login;
