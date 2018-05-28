EXTENSIONS = %w[hash]
STORES = %w[events] #[sponsor events]

EXTENSIONS
  .each { |extension| require_relative "./extensions/#{extension}" }

STORES
  .each { |store| require_relative "./stores/#{store}" }

static!

four_oh_four!

route ('/events') { Events.to_json }
route ('/sponsors') { Sponsor.all.to_json }

run!
