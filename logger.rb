require "active_support/logger"

puts "#{ActiveSupport} Hello from logger"

class SEOLogger < ::Logger
  def initialize (stream)
    puts "Our Stream #{stream}"
  end
end

seo_logger = SEOLogger.new (STDOUT)
# config.logger.extend(
puts ActiveSupport::Logger.broadcast(seo_logger)
# )

seo_logger.debug "Debug level"
seo_logger.info "Info level"
seo_logger.error "Error level"
