export default `
.info-row
  label(for=id, class='info-row__left') #{label}
  input(type=type || 'text', name=id, id=id, value=value, class='info-row__right', readonly=readonly, required=required === undefined ? true : false)
.error #{error}
`;
