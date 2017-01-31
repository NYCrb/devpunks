require "json"
require "date"
require "open-uri"

module DevPunks
  class Events
    API_URL =  "https://api.meetup.com/NYC-rb/events?status=past"

    def call env
      [200, { "Content-Type" => "application/json" }, [body]]
    end

    def body
      JSON.dump to_h
    end

    def to_h
      data.map do |hash|
        {
                    "Name": hash["name"],
                    "Date": date_format(hash["time"]),
          "Attendee Limit": hash["rsvp_limit"],
                "Attended": hash["yes_rsvp_count"],
                    "Link": hash["link"]
        }
      end
    end

    def data
      @data ||= JSON.parse open(API_URL).read
    end

    def date_format time
      Time.at(time / 1_000).strftime "%Y-%m-%d"
    end
  end
end
