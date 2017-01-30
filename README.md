# devpunks

> devpunk starts with just a rack app and a dream

Right now, this codebase only exists to serve the website for devpunks dot com.

But five minutes from now, it could be anything!

# Contributing

The site copy and configuration are stored in YAML files under `data/`.

devpunk uses `EasyData` to massage info from these files for use in templates.

See `homepage.rb` and `events.rb` for examples of endpoints.

See `config.ru` for how to add and route to endpoints.

# Running
## Development
```bash
$ bundle exec shotgun
```

## Production
```bash
$ rackup
```

# Dependencies
- [Rack](https://rack.github.io)

## Development
- [Shotgun](https://github.com/rtomayko/shotgun#shotgun)

# Skeleton Framework: or...Why Rack?
- [Web Servers vs. App Servers](http://www.justinweiss.com/articles/a-web-server-vs-an-app-server/)
- [Rails vs. Sinatra](https://blog.engineyard.com/2014/rails-vs-sinatra)
- [How Does Rack Work?](https://blog.engineyard.com/2015/understanding-rack-apps-and-middleware)
