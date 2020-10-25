import React from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../context/AuthContext";
import { SpaceBetween, Divider } from "./StyledComponents";

function GoogleAuth() {
  const { googleSignIn } = useAuth();
  return (
    <div className="d-flex align-items-center justify-content-around flex-column p-3">
      <Divider />
      <SpaceBetween />
      <GoogleButton onClick={() => googleSignIn()} />
    </div>
  );
}

export default GoogleAuth;
