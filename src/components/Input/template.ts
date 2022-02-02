export default `
input(type=type || 'text', name=id, id=id, placeholder='| ', class='input', required=required === undefined ? true : false, autocomplete=autocomplete, value=value, maxlength=maxlength)
label(for=id, class='placeholder') #{label}
.error #{error}
`;