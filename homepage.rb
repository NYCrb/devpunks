require "haml"

require "./easy_data"

module DevPunks
  class HomePage
    def call env
      [200, { "Content-Type" => "text/html" }, [body]]
    end

    def body
      template.render self, EasyData["site", "index"]
    end

    def template
      Haml::Engine.new File.read("index.haml")
    end
  end
end
