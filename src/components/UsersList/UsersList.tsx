import React, {FC, useEffect, useState} from 'react';
import { pluralize } from '../../helpers/utils';
import { queries } from '../../helpers/api';
import { User, List } from "../../types";
import './UsersList.css';
import { Link } from 'react-router-dom';

interface Prop {
  users: User[];
  query: string | null;
};

export const UsersList: FC<Prop> = ({ query, users }) => {
  // создаём в стейте вспомогательный массив для рендера пользователей
  const [ usersList, setUsersList] = useState<List[]>(
    users.map(user => ({
      login: user.login,
      image: user.avatar_url,
      organization: '',
      repos: ''
    }))
  )

  // заполняем вспомогательный массив данными об организации и репозиторих
  useEffect(() => {
    queries(users)
      .then(result => {
        let b: List[] = users.map((user, index) => {
          return { 
            login: user.login, 
            image: user.avatar_url,
            organization: result[0][index][0] ? result[0][index][0].login : "",
            repos: result[1][index].public_repos + " " + pluralize(result[1][index].public_repos)
            // repos: result[1][index].length + " " + pluralize(result[1][index].length)
          }
        })

          setUsersList(b);
      })
  }, [query, users])

  return <div className='users-list'>
    {usersList.map((user) => (
        <section className="users-list__item" key={user.login}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={ user.image } alt={ user.login + "profile photo"} />
          </div>
          <div className="users-list__content">
            <h2 className='users-list__title'>
              <Link to={ "/users/" + user.login } className="link">{ user.login }</Link>
              { ", " + user.repos + (user.organization ? "," : "") }
            </h2>
            <p className="users-list__text">{user.organization}</p>
          </div>
        </section>
    ))}
  </div>;
};