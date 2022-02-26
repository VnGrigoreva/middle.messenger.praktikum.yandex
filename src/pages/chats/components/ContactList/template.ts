export default `
.chat-list__header
  #{profile}
  #{search}
.chat-list__contacts
  each contact in contacts
    #{contact}
`;
