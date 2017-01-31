require "rack"
require "rack/contrib"

require "./homepage"
require "./events"

use Rack::ShowExceptions

use Rack::TryStatic,
  root: "public",
  urls: %w[/]

map "/events" do
  run DevPunks::Events.new
end

run lambda { |env|
  case env["PATH_INFO"]
  when "/"
    DevPunks::HomePage.new
  else
    Rack::NotFound.new("public/404.html")
  end.call env
}
