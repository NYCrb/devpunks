%w[hash]
  .each { |extension| require_relative "./extensions/#{extension}" }

%w[events]
  .each { |store| require_relative "./stores/#{store}" }

require_relative './helpers'

static!

four_oh_four!

route ('/events') { json Events }

run!
