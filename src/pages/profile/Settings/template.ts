export default `
#{aside}
.profile-content
  .profile-content__inner.ai-c
    img(src=src, alt="avatar", class="profile__avatar")
    h3 Иван
  form(method=GET, action='/profile', class='profile-content__form')
    #{email}
    #{login}
    #{firstName}
    #{secondName}
    #{displayName}
    #{phone}
    .profile-content__inner.ai-c
      input(type='submit', value='Сохранить', class='button')
`;
