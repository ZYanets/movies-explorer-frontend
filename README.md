# Movies Explorer
Фронтенд для многостраничного приложения по поиску фильмов с возможностью добавления/удаления в избранное и фильтрацией. Реализован функционал регистрации, авторизации, редактирования профиля пользователей.  
**Бэкенд проекта:** https://github.com/ZYanets/movies-explorer-api  
**Ссылка на сайт:** https://moviesexplorer.zya.nomoredomains.work/

Реализовано:
- регистрация, авторизация и аутентификация пользователей
- редактирование данных профиля пользователя
- поиск фильмов по ключевым словам
- хранение данных поиска в локальном хранилище localStorage
- добавление/удаление фильмов в избранное
- фильтрация короткометражных фильмов
- защищенные роуты, не допускающие отображение страницы неавторизованным пользователям

## Использованные технологии
`React.js`, `React Hooks`, `CSS Grid`, `CSS Flexbox`, `ESLint`

## Роуты
`/` — отображается страница «О проекте»  
`/movies` — отображается страница «Фильмы»  
`/saved-movies` — отображается страница «Сохранённые фильмы»  
`/profile` — отображается страница с профилем пользователя  
`/signin` — отображается страница авторизации  
`/signup` — отображается страница регистрации  

## Ссылки
нажатие на `логотип` ведёт на страницу «О проекте»  
нажатие на `«Фильмы»` — на роут `/movies`  
нажатие на `«Сохранённые фильмы»` — на роут `/saved-movies`  
нажатие на `«Регистрация»` — на роут `/signup`  
нажатие на `«Авторизация»` — на роут `/signin`  
нажатие на `«Аккаунт»` — на роут `/profile`  

## Запуск проекта
- `git clone git@github.com:ZYanets/movies-explorer-frontend.git` - клонировать проект с удаленного репозитория
- `npm install` - установить модули прописанные в зависимостях package.json, для чего выполнить команду
- `npm start` — запустить проект на локальном сервере  
- `npm run build` — собрать проект  

## Статус
Проект завершен
