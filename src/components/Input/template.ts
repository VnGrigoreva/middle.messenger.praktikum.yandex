export default `
mixin input(label, id, type, onkeypress, error, pattern, required = true, autocomplete='', value)
  input(type=type || 'text', name=id, id=id, placeholder='| ', class='input', required=required, pattern=pattern, autocomplete=autocomplete, value=value)
  label(for=id, class='placeholder') #{label}
  .error #{error}
+input(label, id, type, onkeypress, error, pattern, required, autocomplete, value)`