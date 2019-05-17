require "active_support/logger"

class CustomLogger < ::Logger
  def initialize (stream)
    puts "Our Stream #{stream}"
  end
end

logger = CustomLogger.new (STDOUT)

puts ActiveSupport::Logger.broadcast(seo_logger)

seo_logger.debug "Debug level"
seo_logger.info "Info level"
seo_logger.error "Error level"
