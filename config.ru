class DevPunks
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
        [200, {'Content-Type' => 'text/html'}, ['\m/ Dev Punks \m/']]
    end
  end
end

run DevPunks.new
