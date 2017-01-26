require './action'
require './application'

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
