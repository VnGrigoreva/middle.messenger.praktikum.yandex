export default `
#{aside}
.profile-content
  .profile-content__inner.ai-c
    img(src=src, alt="avatar", class="profile__avatar")
    input(type="file", name="avatar", accept="image/*")
    h3 #{displayNameTitle}
  form(method=GET, action='/profile', class='profile-content__form')
    #{email}
    #{login}
    #{firstName}
    #{secondName}
    #{displayName}
    #{phone}
    .profile-content__inner.ai-c
      input(type='submit', value='Сохранить', class='button' disabled=isLoading)
    if isLoading
      .loading Пожалуйста подождите...
    if isError
      .error-center #{error}
`;
