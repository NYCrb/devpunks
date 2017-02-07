require 'json'
require 'date'
require 'open-uri'

class Events
  def self.to_json
    data.map do |hash|
      {
        "Name": "#{hash['name']}",
        "Date": "#{date_format(hash['time'])}",
        "Attendee Limit": "#{hash['rsvp_limit']}",
        "Attended":  "#{hash['yes_rsvp_count']}",
        "Link": "#{hash['link']}"
      }
    end.to_json
  end

  def self.data
    uri = 'https://api.meetup.com/NYC-rb/events?status=past'

    @data ||= JSON.parse(open(uri).read)
  end

  def self.date_format(time)
    Time.at(( time / 1_000 )).strftime '%Y-%m-%d'
  end
end
