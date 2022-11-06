import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import UsersContext from "../../store/users-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);

    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>Users-Listing</div>
            </Link>
            <nav>
                <ul>
                    {!authCtx.isLoggedIn && (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}

                    {authCtx.isLoggedIn && (

                      <li>
                          <button onClick={(event) => {
                            event.preventDefault();
                            authCtx.logout();
                          }}>Logout</button>
                      </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
