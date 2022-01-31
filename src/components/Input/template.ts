export default `
input(type=type || 'text', name=id, id=id, placeholder='| ', class='input', required=required === undefined ? true : false, pattern=pattern, autocomplete=autocomplete, value=value)
label(for=id, class='placeholder') #{label}
.error #{error}
`