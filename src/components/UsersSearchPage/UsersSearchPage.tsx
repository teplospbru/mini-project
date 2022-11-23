import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { nineUsers } from '../../helpers/utils';
import { fetchGitHubSearch } from '../../helpers/api';
import { User } from '../../types';

// components
import { Header } from '../Header/Header';
import { UsersList } from '../UsersList/UsersList';

export const UsersSearchPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]); // массив с пользователями
  const [isNotFound, setNotFound] = useState<boolean>(false); // флаг isNotFound === true означает, что пользователь не найден
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // query-параметр q из урла

  // запрашиваем список пользователей, соответствующих query-параметру
  useEffect(() => {
    if (query !== null) {
      fetchGitHubSearch(query).then((response) => {
        setUsers(nineUsers(response.items));
        if (response.total_count === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      });
    }
  }, [query]);

  return (
    <>
      <Header title={query} isHomePage={false} />

      {isNotFound ? (
        <main>
          <div className="container">
            <h1 className="title">Ничего не найдено по запросу {query !== null ? query : ''}</h1>
          </div>
        </main>
      ) : (
        <main>
          <div className="container">
            <h1 className="title">Пользователи по запросу {query !== null ? query : ''}</h1>
            <UsersList users={users} query={query} />
          </div>
        </main>
      )}
    </>
  );
};
