void function () {
  let script = '<script src=\/browser-sync\/browser-sync-client.js><\/script>'

  if (/localhost/.test (location.hostname))
    document.write (script)
} ()
console.log ('loading browsersync')
