export default `
mixin input(label, id, type, onkeypress, error, pattern, required = true)
  input(type=type || 'text', name=id, id=id, placeholder='| ', class='input', required=required, pattern=pattern, onkeypress=onkeypress)
  label(for=id, class='placeholder') #{label}
  .error.is-hidden #{error}
+input(label, id, type, onkeypress, error, pattern, required)`