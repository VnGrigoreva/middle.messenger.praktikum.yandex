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
      input(type='submit', value='Зарегистрироваться', class='button', id='registration' disabled=isLoading)
      #{entry}
      if isLoading
        .loading Пожалуйста подождите...
      if isError
        .error-center #{error}
      if isSuccess
        .success #{success}
`;
