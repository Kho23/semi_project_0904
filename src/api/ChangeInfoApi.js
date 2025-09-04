import React from "react";
import { useNavigate } from "react-router-dom";

const ChangeInfoApi = () => {
  const navigate = useNavigate();

  const editInfoPassword = () => {
    navigate("/");
  };

  const editInfoBirth = () => {
    navigate("/");
  };

  const finishEdit = () => {
    navigate("/myPage");
  }

  return { editInfoPassword, editInfoBirth, finishEdit, navigate };
};

export default ChangeInfoApi;
