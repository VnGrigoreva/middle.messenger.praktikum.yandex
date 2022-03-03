export default `
#{contactList}
.chat-content
  .chat-header
    .chat-header__left
      .avatar
        .avatar-img
      span.name #{userName}
    .chat-header__right
      #{menu}
  .chat-messager
    each message in messages
      #{message}
  .chat-footer
    #{attach}
    #{newMessage}
    #{send}
`;
