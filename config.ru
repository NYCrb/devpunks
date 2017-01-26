%w[events]
  .each { |store| require_relative "./stores/#{store}" }

require_relative './helpers'

#static!
#four_oh_four!

use Rack::TryStatic,
  root: "public",
  urls: %w[/],
  try: ['.html']

run Rack::NotFound.new('./public/404.html')


# route ('/events') { json Events }
# route ('/arun') { 'Arun' }
# route ('/arun') { 'Arun' }

# run!
