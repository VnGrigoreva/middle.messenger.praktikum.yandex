export default `
.authorization-container
  h2 Регистрация
  form(method=GET, action='/registration', class='authorization-form')
    .authorization-form__inner
      #{email}
      #{login}
      #{firstName}
      #{secondName}
      #{phone}
      #{password}
      #{verifyPassword}
    .authorization-form__inner
      input(type='submit', value='Зарегистрироваться', class='button', id='registration')
      #{entry}
script(src='./authorization.ts')
`