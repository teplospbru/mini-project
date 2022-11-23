import React, { FC, useEffect, useState } from 'react';
import { nineUsers } from '../../helpers/utils';
import { UsersList } from '../UsersList/UsersList';
import { fetchGitHubUsers } from '../../helpers/api';
import { User } from '../../types';

// components
import { Header } from '../Header/Header';

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]); // массив с пользователями

  // запрашиваем список пользователей
  useEffect(() => {
    fetchGitHubUsers().then((response) => setUsers(nineUsers(response)));
  }, []);

  return (
    <>
      <Header title={null} isHomePage={true} />

      <main>
        <div className="container">
          <UsersList users={users} query={null} />
        </div>
      </main>
    </>
  );
};
