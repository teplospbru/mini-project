import React, {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './UserProfilePage.css';
import { fetchGitHubSingleUser, fetchGitHubRepos } from '../../helpers/api';
import { prettyFollow } from '../../helpers/utils';
import { Repo, SingleUser } from '../../types';

// components
import {Header} from "../Header/Header";

export const UserProfilePage: FC = () => {
  const { id } = useParams(); // получаем id-параметр из урла
  const [ user, setUser ] = useState<SingleUser>(); // объект со свойствами юзера
  const [ repos, setRepos ] = useState<Repo[]>(); // массив с репозиториями

  // получаем юзера
  useEffect(() => {
    if(id) {
      fetchGitHubSingleUser(id)
      .then(response => {
        console.log(response)
        setUser(response)
      });
    }
  }, []);

  // получаем репозитории юзера
  useEffect(() => {
    if(user?.repos_url) {
      fetchGitHubRepos(user.repos_url)
        .then(response => setRepos(response))
    }
  }, [user])

  return <>
    <Header title={ id ? id : null } isHomePage={ false } />

    {
      user && (
        <main>
          <div className="container">
            <section className="user-profile">
              <div className="user-profile__image-container">
                <img className="user-profile__image" src={ user.avatar_url } alt={ user.login + " profile photo" } />
              </div>
              <div className="user-profile__content">
                <h1 className="user-profile__title">{ user.name ? user.name + ", " : "" }<span className="user-profile__accent">{ user.login }</span></h1>
                <p className="user-profile__text">
                  {
                    user.followers > 0
                      ? <><span className="user-profile__accent">{ prettyFollow(user.followers) }</span><>{
                        user.following 
                          ? " followers · " 
                          : " followers"
                      }</></>
                      : null
                  }
                  {
                    user.following > 0
                    ? <><span className="user-profile__accent">{ prettyFollow(user.following) }</span><>{
                      user.blog 
                        ? " following · " 
                        : " following"
                    }</></>
                    : null
                  }
                  <a href={ user.blog } className="link">{ user.blog }</a>
                </p>
              </div>
            </section>

            {
              repos && repos.length > 0 && (
                <section className="repository-list">
                  <div className="repository-list__header">
                    <h2 className="repository-list__title">Репозитории</h2>
                    <a href={ "https://github.com/" + user.login + "?tab=repositories" } className="link" target="_blank">Все репозитории</a>
                  </div>

                  <div className="repository-list__container">
                    {repos.map((repo) => (
                        <section className="repository-list__item" key={repo.id}>
                          { repo.name ? (<h3 className="repository-list__item-title"><a href={ repo.svn_url } className="link">{ repo.name }</a></h3>) : null }
                          { repo.description ? (<p className="repository-list__item-text">{ repo.description }</p>) : null }
                        </section>
                    ))}
                  </div>
                </section>
              )
            }
          </div>
        </main>
      )
    }
  </>;
};
