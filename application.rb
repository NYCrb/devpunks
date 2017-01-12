class Application
  def self.app
    @app ||= begin
      Rack::Builder.new
    end
  end
end
