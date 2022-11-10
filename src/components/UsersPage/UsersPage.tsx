import React, {FC, useEffect, useState} from 'react';
import {UsersList} from "../UsersList/UsersList";

export const UsersPage: FC = () => {
  const [ users, setUsers ] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(response => {
        let arr: User[] = [];
        for(let i = 0; response.length > 9 ? i < 9 : i < response.length; i++) {
          arr.push(response[i])
        }
        setUsers(arr)
      })
  }, []);

  //console.log("users: ",users);

  if(users && users.length === 0) {
    return null;
  }

  return <>  
    <main>
      <div className="container">
        <UsersList 
          users={ users } 
        />
      </div>
    </main>
  </>;
};