import React from "react";
import { Navigate } from "react-router-dom";
import useLocalCode from "./hooks/useLocalCode";
import useLocalToken from "./hooks/useLocalToken";
import useCodeVerifier from "./hooks/useCodeVerifier";

export default function Main() {
  //const [tokenGranted, setTokenGranted] = useState(false);
  const code = useLocalCode();
  const localToken = useLocalToken();
  const codeVerifier = useCodeVerifier();

  console.log("code", code);
  console.log("localToken", localToken);
  console.log("codeVerifier", codeVerifier);
  return (
    <>
      {!code && <Navigate to="/login" />}
      {code && !localToken && <Navigate to="/requestToken" />}
      {code && localToken && <Navigate to="/search" />}
    </>
  );
}
