import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import UseInput from "../Hooks/UseInput";


export default () => {
    
    const [action, setAction] = useState("logIn");
    const username = UseInput("");
    const password = UseInput("");
    const firstName = UseInput("");
    const lastName = UseInput("");
    const email = UseInput("");
    
    return (
      <AuthPresenter
        setAction={setAction}
        action={action}
        username={username}
        password={password}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    );
}