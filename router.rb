class DevPunks::Router
  def self.app
    @app ||= begin
      Rack::Builder.new do
        map '/' do
          run ->(env) {[200, {'Content-Type' => 'text/plain'}, ['\m/ Dev Punks \m/']] }
        end
      end
    end
  end

  def call(env)
    request = Rack::Request.new env

    case request.path_info
      when /videos/
        [500, {"Content-Type" => "text/html"}, ['Videos']]
      when /podcast/
        [500, {"Content-Type" => "text/html"}, ['Podcasts']]
      when /jobs/
        [500, {"Content-Type" => "text/html"}, ['Jobs']]
      when /sponsors/
        [500, {"Content-Type" => "text/html"}, ['Sponsors']]
      when //
    end
  end
end
