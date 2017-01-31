require "redcarpet"

module DevPunks
  module Markdown
    Engine = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

    def self.render str
      Engine.render(str)
    end

    def self.render_inline str
      # By default, the Markdown HTML renderer wraps everything in <p> tags.
      # It also appends a \n to the end of every rendered output string.  Since
      # many of the things we're Markdowning are meant to be inline, the <p>
      # tags and \n are stripped out here, leaving the decision to the
      # template(s).
      self.render(str).strip[3...-4]
    end
  end
end
