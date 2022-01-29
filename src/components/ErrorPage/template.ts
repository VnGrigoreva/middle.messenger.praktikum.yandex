export default `
mixin errorPage(code, message)
  .error-container
    .error-code #{code}
    .error-message #{message}
    #{backLink}
+errorPage(code, message)
`