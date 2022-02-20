export default `
#{aside}
.profile-content
  .profile-content__inner.ai-c
    img(src=src, alt="avatar", class="profile__avatar")
  form(method=GET, action='/password', class='profile-content__form')
    #{oldPassword}
    #{newPassword}
    #{verifynewPassword}
    .profile-content__inner.ai-c
      input(type='submit', value='Сохранить', class='button')
  if isLoading
    .loading Пожалуйста подождите...
  if isError
    .error #{error}
`;
