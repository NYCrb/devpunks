# devpunks

### DSL (Domain Specific Language) for ([config.ru](https://github.com/NYCrb/devpunks/blob/master/config.ru))
Inspired by Express.js _(http://expressjs.com/)_ routing.

#### static!
Expose static files _(defaults to ./public)_
```ruby
static!
````

#### four_oh_four!
Fallback error page for missing route definitions.
```ruby
four_oh_four! # /not-found => 404 & renders ./public/404.html
````

#### route
Define handler for route URI
```ruby
route ('/foo') { 'devPunks' }
````

#### params
Access to _(GET, POST, PUT, & PATCH)_ request parameters
```ruby
route ('/echo?value=Hello') { "#{params[:value]} World!" }
````

#### status
Get or set the response code.
```ruby
status 201 #=> Responds with 201 CREATED
````

#### json
Responds with a JSON body
```ruby
json(foo: 'bar', baz: 'bat') #=> "{\"foo\":\"bar\", \"baz\":\"bat\"}"
````

#### run!
Run the Application
```ruby
run!
````

### Install
```bash
$ bundle
```

### Running Server
#### Development
```bash
$ bundle exec shotgun
```

#### Production
```bash
$ rackup
```

### Dependencies
  - [Rack](https://rack.github.io)

#### Development
  - [Shotgun](https://github.com/rtomayko/shotgun#shotgun)

### Skeleton Framework: or...Why Rack?
Web Servers vs. App Servers
http://www.justinweiss.com/articles/a-web-server-vs-an-app-server/

Rails vs. Sinatra
https://blog.engineyard.com/2014/rails-vs-sinatra

How Does Rack Work?
https://blog.engineyard.com/2015/understanding-rack-apps-and-middleware
