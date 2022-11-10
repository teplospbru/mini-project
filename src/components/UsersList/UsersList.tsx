import React, {FC, useEffect, useState} from 'react';
import './UsersList.css';

interface Prop {
  users: User[];
};

interface List {
  login: string;
  image: string;
  org?: string;
}

export const UsersList: FC<Prop> = ({ users }) => {
  // создаём в стейте вспомогательный массив для рендера пользователей
  const [ usersList, setUsersList] = useState<List[]>(
    users.map(user => ({
      login: user.login,
      image: user.avatar_url,
      org: ''
    })
  ))

  // здесь делаем запрос и отаём ответ с задержкой 
  function fetchGitHub (url: string): Promise<Organization[]> {
    // этот вывод в консоль покажет, что вызываем
    console.log(`fetch to: ${url}`);
    return new Promise(resolve => {
        setTimeout(() => {
          fetch(url).then(response => response.json()).then(response => {
            console.log(response)
            return resolve(response)
          })
        }, 200);
    })
};

  // при помощи этой функции вызываем fetchGitHub() по количеству пользователй
  async function asyncAwaitWay(arr: User[]) {
    const asyncFetch = async () => {
        let results: Organization[] | null = [];
        for (let i = 0; i < arr.length; i++) {  
            const data: Organization[] = await fetchGitHub(arr[i].organizations_url);
            console.log('Ответ сервера по организации пользователя: ', data[0])
            results.push(data[0])

            // Здесь я создал промис, который будет брать usersList(переменная стейта)
            // и добавлять организацию i-тому пользователю
            const p: Promise<List[]> = new Promise(resolve => {
              let b: List[] = usersList.map((user, index) => {
                if(data[0] && index === i) {
                  return { ...user, org: data[0].login }
                } else {
                  return { ...user }
                }
              })
              resolve(b)
            })
            
            // Здесь принеяю этот промис
            p.then(b => {
              setUsersList((prev) => b) // проблема здесь
              console.log('2: ', b)
            })
        }
        return results;
    }
    const result = await asyncFetch();
    //console.log(result)
    return result;
}

  useEffect(() => {
    if(users && users.length > 0) {
      asyncAwaitWay(users)
    }
  }, [users])
  
//console.log(usersList)
  return <div className='users-list'>
    {usersList.map((user, index) => (
        <section className="users-list__item" key={user.login}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={ user.image } alt={ user.login + "profile photo"} />
          </div>
          <div className="users-list__content">
            <h2 className='users-list__title'><a href="/" className="link">{ user.login }</a>, 15 репозиториев</h2>
            <p className="users-list__text">{"Название организации" + user.org}</p>
          </div>
        </section>
    ))}
  </div>;
};



// На то, что ниже обращать внимание не нужно!!

// const users:Promise<User[]> = fakeFetch('https://api.github.com/users')

// fetch(users[0].organizations_url)
// .then(response => response.json())
//     .then(response => console.log('org: ',response))

//     fetch(`https://api.github.com/users/${users[0].login}/repos?per_page=1000`)
// .then(response => response.json())
//     .then(response => console.log('repos: ',response))

  // const a = users.map(user => ({
  //   login: user.login,
  //   image: user.avatar_url,
  //   org: ''
  // }))