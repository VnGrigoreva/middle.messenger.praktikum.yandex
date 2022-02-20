export default `
#{aside}
.profile-content
  if isLoading
    .loading Пожалуйста подождите...
  else
    if isError
      .error #{error}
    else
      .profile-content__inner.ai-c
        img(src=src, alt="avatar", class="profile__avatar")
        h3 Иван
      #{email}
      #{login}
      #{firstName}
      #{secondName}
      #{displayName}
      #{phone}
  .profile-content__inner
    #{changeData}
    #{changePassword}
    #{logout}
`;
