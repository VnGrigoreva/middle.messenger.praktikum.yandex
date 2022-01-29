export default `
.authorization-container
  h2 Вход
  form(method=GET, action='/authorization', class='authorization-form')
    .authorization-form__inner
      #{login}
      #{password}
    .authorization-form__inner
      input(type='submit', value='Авторизироваться', class='button')
`