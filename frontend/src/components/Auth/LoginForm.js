import { useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import configObject from "../../config";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const LoginForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);


    const LoginHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

      try{
          const response = await fetch(configObject.BASE_URL + '/auth/login', {
              method: 'POST',
              body: JSON.stringify({
                  email: enteredEmail,
                  password: enteredPassword
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          const data = await response.json();
          if(!response.ok){
              alert(data.message);
          }else{
              authCtx.login(data.tokens.access);
              history.push('/');
          }
          return data;
      }catch(error){
          alert(error.message);
      }
    };

    return (
        <section className={classes.auth}>
            <h1>Login</h1>
            <form onSubmit={LoginHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" ref={emailInputRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" ref={passwordInputRef} required />
                </div>
                <div className={classes.actions}>
                    <button>Login</button>
                    <Link to="/register">
                        <button type="button" className={classes.toggle}>
                            Create new account
                        </button>
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default LoginForm;
