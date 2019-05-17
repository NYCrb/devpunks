require "active_support/logger"

class CustomLogger < ::Logger
  def initialize (stream)
    puts "Our Stream #{stream}"
  end
end

default = ActiveSupport::Logger.new (STDOUT)
logger  = CustomLogger.new(STDOUT)

puts ::Logger
puts default.extend(ActiveSupport::Logger.broadcast(logger))

logger.debug "Debug level"
logger.info "Info level"
logger.error "Error level"
