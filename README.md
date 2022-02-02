### [WiNMessager](https://condescending-lamport-4f12e6.netlify.app)
---

Простой месседжер для общения.
Проект разарабатывается в рамках курса Яндекс.Практикум.

Доступные страницы месседжера:

- Авторизация
- Регистрация
- Профиль
- Страницы 500 и 404
- Список чатов

[Ссылка](https://condescending-lamport-4f12e6.netlify.app) для просмотра

## Как будет выглядеть месседжер
Макет [здесь](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

## Скрипты

Для запуска проекта используются:

- `yarn dev` — запуск приложения в режиме разработки, http://localhost:3000 для просмотра в браузере.
- `yarn start` — сборка и запуск приложения с веб-сервером, http://localhost:3000 для просмотра в браузере.
- `yarn build` — сборка стабильной версии.

## Pull requests

- Добавлен компонентный подход
- Жизненный цикл компонентов реализован с применением Event Bus
- Обновление пропсов компонентов работает через Proxy
- Добавлена валидация на все формы
- Проект переведен на ts
- Добавлены  ESLint, Stylelint
- Добавлен класс для работы с АПИ

https://github.com/VnGrigoreva/middle.messenger.praktikum.yandex/pull/2
