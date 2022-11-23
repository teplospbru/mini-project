import React, { FC, SyntheticEvent, useState, KeyboardEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Header.css';

interface Prop {
  title: string | null;
  isHomePage: boolean;
}

export const Header: FC<Prop> = ({ title = null, isHomePage }) => {
  const [searchParams] = useSearchParams();

  // рассчитываем начальное значение для инпута
  const initialValue = () => {
    const a = searchParams.get('q');

    if (a === null || a.length === 0) {
      return '';
    } else {
      return a;
    }
  };

  const [searchValue, setSearchValue] = useState(initialValue()); // значение инпута
  const [isFocused, setFocused] = useState(false); // состояние фокуса на инпуте
  const navigate = useNavigate();

  // Хэндлеры фокуса
  const focusHandler = () => {
    setFocused(true);
  };

  const blurHandler = () => {
    setFocused(false);
  };

  // Хэндлер нажатия на "Enter"
  const pressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isFocused) {
      navigate({
        pathname: '/search/users',
        search: 'q=' + searchValue,
      });
    }
  };

  // Хэндлер нажатия на кнопку "Искать"
  const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue.trim().length) {
      return;
    }

    navigate({
      pathname: '/search/users',
      search: 'q=' + searchValue,
    });
  };

  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            {isHomePage ? (
              <>
                <li className="header__navigation-list-item">
                  <span className="header__navigation-link">Пользователи гитхаба</span>
                </li>
              </>
            ) : (
              <>
                <li className="header__navigation-list-item">
                  <a href="/" className="header__navigation-link">
                    Пользователи гитхаба
                  </a>
                </li>
                <li className="header__navigation-list-item">
                  <a className="header__navigation-link header__navigation-link--user">{title !== null ? title : ''}</a>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="header__search">
          <form className="header__search-form" onSubmit={onSubmit}>
            <input
              type="search"
              className="header__search-input"
              placeholder="Поиск пользователя"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              onKeyPress={pressEnterHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
            <button type="submit" className="header__search-button">
              Найти
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
