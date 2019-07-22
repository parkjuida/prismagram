import React, { useState } from "react";
import {useMutation} from "react-apollo-hooks";
import { toast } from 'react-toastify';
import AuthPresenter from "./AuthPresenter";
import UseInput from "../../Hooks/UseInput";

import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";


export default () => {
    
    const [action, setAction] = useState("logIn");
    const username = UseInput("");
    const firstName = UseInput("");
    const lastName = UseInput("");
    const secret = UseInput("");
    const email = UseInput("");
    const requestSecretMutation = useMutation(LOG_IN, {
      variables: { email: email.value }
    });

    const createAccountMutation = useMutation(CREATE_ACCOUNT, {
      variables: {
        email: email.value,
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value
      }
    })

    const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
      variables: {
        email: email.value,
        secret: secret.value,
      }
    })

    const localLogInMutation = useMutation(LOCAL_LOG_IN, {

    })

    const onSubmit = async(e) => {
      e.preventDefault();
      if (action === "logIn") {
        if (email.value !== "") {
          try {
            const { data:{requestSecret} } = await requestSecretMutation();
            if (!requestSecret) {
              toast.error("You don`t have an account byet, create one");
              setTimeout(() => setAction("signUp"), 3000);
            } else {
              toast.success("Check your inbox for your login secret");
              setAction("confirm");
            }
          } catch {
            toast.error("Could not request secret");
          }
        } else {
          toast.error("Email is required");
        }
      } else if (action === "signUp") {
        if (email.value !== "" &&
            username.value !== "" &&
            firstName.value !== "" &&
            lastName.value !== "") {
              try {
                const { data:{createAccount} } = await createAccountMutation();
                console.log(createAccount)
                if (!createAccount) {
                  toast.error("Can`t create account");
                } else {
                  toast.success("Account created! Log in now");
                  setTimeout(() => setAction("logIn"), 3000);
                }
              } catch (e) {
                toast.error(e.message);
              }
        } else {
          toast.error("All field are required");
        }
      } else if (action === "confirm") {
        if (secret.value !== "") {
          try {
            const { data:{confirmSecret:token} } = await confirmSecretMutation();
            if (token !=="" && token !== undefined) {
              localLogInMutation({ variables: { token } });
            } else {
              throw Error();
            }
          
          } catch {
            toast.error("Can`t confirm secret");
          }
        }
      }
    }

    return (
      <AuthPresenter
        setAction={setAction}
        action={action}
        username={username}
        firstName={firstName}
        lastName={lastName}
        email={email}
        secret={secret}
        onSubmit={onSubmit}
      />
    );
}