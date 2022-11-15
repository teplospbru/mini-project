import { User } from "../types";

// Плюрализируем слово "репозиторий"
export const pluralize = (repos: number) => {
    const arr = repos.toString();

    const zeroToNine = (temp: number) => {
        if(temp === 0 || (temp >= 5 && temp <= 9)) {
            return "репозиториев"
        } else if(temp >= 2 && temp <= 4) {
            return "репозитория"
        } else {
            return "репозиторий"
        }
    }

    const tenToNineteen = () => {
        return "репозиториев"
    }

    if(arr.length > 1) {
        const miniArr = Number(arr.slice(arr.length - 2));

        if(miniArr < 20) {
            return tenToNineteen()
        } else {
            return zeroToNine(Number(miniArr.toString().slice(1)))
        }
    } else {
        return zeroToNine(repos)
    }    
}

// Обрезаем массив до 9 пользователей
export const nineUsers = (users: User[]) => {
    let arr: User[] = [];

    for(let i = 0; users.length > 9 ? i < 9 : i < users.length; i++) {
      arr.push(users[i])
    }

    return arr
}

// форматируем вывод количества фолловеров
export const prettyFollow = (follow: number) => {
    if(follow >= 1000) {
        return (follow / 1000).toFixed(1) + " K";
    } else {
        return follow;
    }
}