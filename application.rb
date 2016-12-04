require './action'

class Application
  def self.app
    @app ||= begin
      Rack::Builder.new
    end
  end
end

def route(pattern, &block)
  Application.app.map pattern do
    run Action.new &block
  end
end
