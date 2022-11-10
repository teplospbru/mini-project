import React, {FC, useEffect, useState} from 'react';
import {Header} from "../Header/Header";
import { UsersList } from "../UsersList/UsersList";

export const UsersSearchPage: FC = () => {
  const [ users, setUsers ] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(response => setUsers(response))
  }, []);

  console.log("users: ",users);

  if(users && users.length === 0) {
    return null;
  }

  return (
      <>
        {/* <Header /> */}
        
        <main>
          <div className="container">
            <h1 className="title">Пользователи по запросу defunkt</h1>
            <UsersList users={ users }  />
          </div>
        </main>
      </>
  );
};
