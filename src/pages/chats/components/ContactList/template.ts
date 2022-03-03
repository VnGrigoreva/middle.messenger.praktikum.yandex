export default `
.chat-list__header
  #{profile}
  #{search}
  #{add}
if isLoading
  .loading Пожалуйста подождите...
else
  if isError
    .error-center #{error}
  else
    .chat-list__contacts
      each contact in contacts
        #{contact}
`;
