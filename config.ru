$:.unshift File.dirname(__FILE__)

# http://www.rubydoc.info/github/rack/rack/Rack/Static
use Rack::Static, urls: ['/'], root: 'public', index: 'index.html'
use Rack::Static, urls: ['/jobs'], root: 'jobs', index: 'index.html'

require './application'

route '/hello' do
  "Hello #{params['name'] || 'World'}!"
end

route '/videos' do
  'Videos'
end

route '/podcast' do
  'Podcast'
end

route '/jobs' do
  'Jobs'
end

route '/sponsors' do
  'Sponsors'
end

run Application.app
