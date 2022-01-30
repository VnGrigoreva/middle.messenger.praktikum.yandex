export default `
#{aside}
.profile-content
  .profile-content__inner.ai-c
    img(src="~src/assets/images/default_avatar.png", alt="avatar", class="profile__avatar")
  form(method=GET, action='/password', class='profile-content__form')
    #{oldPassword}
    #{newPassword}
    #{verifynewPassword}
  .profile-content__inner.ai-c
    input(type='submit', value='Сохранить', class='button')
`