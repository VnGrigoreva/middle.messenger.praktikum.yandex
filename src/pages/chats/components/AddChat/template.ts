export default `
form
  #{title}
  input(type='submit', value='+ Новый чат', class='button')
if isLoading
  .loading Пожалуйста подождите...
if isError
  .error-center #{error}
`;
