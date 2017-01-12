%w[events]
  .each { |store| require_relative "./stores/#{store}" }

require_relative './helpers'

static!

route ('/events') { json Events }

run!
