import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  const navigate = useNavigate();
  
  const loginIdPassword = () => {
    const storageinfo = JSON.parse(localStorage.getItem("storageinfo")) || [];
    const findinfo = storageinfo.find((i) =>i && i.user_id === id && i.user_password === password);

    if(findinfo) {
      localStorage.setItem("loginUser", JSON.stringify(findinfo));
      alert(`${findinfo.user_lastname}${findinfo.user_firstname}님 로그인 하셨습니다.`);
      navigate("/");
      window.location.reload();
    } else {
      alert("아이디 혹은 비밀번호를 다시 확인해 주세요");
      setId("");
      setPassword("");
    }
  };  
  
  return (
    <Modal isOpen={modal} toggle={r} backdropClassName="bg-black/50" contentClassName="rounded-lg p-5 max-w-sm mx-auto shadow-lg">
      <ModalHeader toggle={r} className="bg-gray-800 text-white border-b-0 text-xl font-bold">
        Login
      </ModalHeader>
      <ModalBody className="flex flex-col gap-4">
        <Form onSubmit={(e) => { e.preventDefault(); loginIdPassword(); }}>
          <div>
            <Label className="font-semibold mb-1 block">ID</Label>
            <Input 
              type="text" 
              placeholder="아이디를 입력하세요" 
              value={id} 
              onChange={(e) => setId(e.target.value)}
              className="p-2.5 rounded-md border border-gray-300 w-full text-base"
            />
          </div>
          <div>
            <Label className="font-semibold mb-1 block">Password</Label>
            <Input 
              type="password" 
              placeholder="비밀번호를 입력하세요" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="p-2.5 rounded-md border border-gray-300 w-full text-base"
            />
          </div>
          <Button 
            color="dark" 
            type="submit" 
            className="w-full p-2.5 rounded-md font-bold cursor-pointer transition-all duration-200 ease-in-out hover:bg-black hover:text-white mt-4"
          >
            Login
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;