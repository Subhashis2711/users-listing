import React, { useState } from "react"

const UsersContext = React.createContext({
    users: [],
    current_page_users: [],
    search: false,
    updateUsers: (users) => {},
    updateCurrentUsers: (users) => {},
    updateSearch: () => {}
});

export const UsersContextProvider = (props) => {
    const [ users, setUsers ] = useState([]);
    const [ currentUsers, setCurrentUsers ] = useState([]);
    const [ search, setSearch ] = useState(false);



    const updateUsersHandler = (users) => {
        setUsers(users);
    }   

    const updateCurrentUsersHandler = (users) => {
        setCurrentUsers(users);
    }   

    const updateSearchHandler = (search) => {
        setSearch(search);
    }

    const contextValue = {
        users: users,
        current_page_users: currentUsers,
        search: search,
        updateUsers: updateUsersHandler,
        updateCurrentUsers: updateCurrentUsersHandler,
        updateSearch: updateSearchHandler

    }

    return <UsersContext.Provider value={contextValue}>{props.children}</UsersContext.Provider>
}

export default UsersContext;