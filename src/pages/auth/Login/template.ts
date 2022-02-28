export default `
.authorization-container
  h2 Вход
  form
    .authorization-form__inner
      #{login}
      #{password}
    .authorization-form__inner
      input(type='submit', value='Авторизироваться', class='button')
  #{registration}
  if isLoading
    .loading Пожалуйста подождите...
  if isError
    .error-center #{error}
`;
