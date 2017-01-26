require './action'
require './application'
require 'rack/contrib/not_found'
require 'rack/contrib/try_static'

def four_oh_four!( path = './public/404.html' )
end

def static!( path='./public' )
  options = {
    gzip: true,
    root: path,
    urls: '/',
    index: 'index.html'
  }

  Application.map options[:urls] do
    run Rack::Static.new self, options
  end
end

def route(pattern, &block)
  Application.map pattern do
    run Action.new &block
  end
end

def run!
  run Application
end
