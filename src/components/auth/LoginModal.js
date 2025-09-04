import React, { useState } from "react";
import '../../css/LoginModal.css';
import { useNavigate } from "react-router-dom";
import {
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";

const LoginModal = ({ modal, r }) => {

  const [id, setId] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 훅
  
  const loginIdPassword = () => {
    const storageinfo = JSON.parse(localStorage.getItem("storageinfo")) || []; // JSON.parse: 문자열 → 객체/배열(꺼낼 때)
    const findinfo = storageinfo.find((i)=>i.user_id === id && i.user_password === password)

    if(findinfo) {
      localStorage.setItem("loginUser", JSON.stringify(findinfo));
      alert(`${findinfo.user_lastname}${findinfo.user_firstname}님 로그인 하셨습니다.`)
      navigate("/");
      window.location.reload();
    } else {
      alert("아이디 혹은 비밀번호를 다시 확인해 주세요");
      setId("");
      setPassword("");
    }
  }  
  
  return (
    <Modal isOpen={modal} toggle={r}>
      <ModalHeader toggle={r}>Login</ModalHeader>
      <ModalBody>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup>

            <Label>ID</Label>
            <Input type="id" placeholder="아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)}/>

            <Label>Password</Label>
            <Input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button color="dark" type="submit" className="mt-3" onClick={loginIdPassword}>
              Login
            </Button>

          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;
