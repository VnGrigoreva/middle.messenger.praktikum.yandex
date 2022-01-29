export default `
mixin link(label, path, mode = 'primary')
  a(href=path class="link-"+mode) #{label}
+link(label, path, mode)
`