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

  return { editInfoPassword, editInfoBirth, navigate };
};

export default ChangeInfoApi;
