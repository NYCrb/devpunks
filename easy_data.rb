require "awesome_print"
require "yaml"
require "ostruct"
require "redcarpet"

# EasyData
#
# EasyData["site", "index"]
# => data/site.yaml
# => data/index.yaml
#
# EasyData reads each YAML file provided and merges them all into a single hash
#
# The hash can then be passed into Haml::Engine#render() and used as locals in
# templates. EasyData makes some changes so the data is easier to work with:

# DOT ATTRIBUTES
#
# For simple informational hashes, EasyData wraps the hash in an OpenStruct,
# which allows us to do things like link.url (as opposed to link["url"], which
# let's face it, is just way more annoying)

# MARKDOWN
#
# For all strings, EasyData runs the string through a Markdown parser and HTML
# renderer so we can easily include formatting anywhere in the site data.

module DevPunks
  module EasyData
    DATA_DIR = "data"
    MARKDOWN = Redcarpet::Markdown.new Redcarpet::Render::HTML

    # Take a list of YAML file basenames and merge them all into one hash.

    def self.[] *files
      results = {}
      each_data_file files do |file|
        YAML.load_file(file).each do |key, value|
          results[key] = wrap_and_render value
        end
      end
      results
    end

    def self.each_data_file files
      files.each do |file|
        yield File.join(DATA_DIR, file + ".yaml")
      end
    end

    def self.wrap_and_render object
      if object.is_a? String
        if object.include? "\n"
          # YAML allows multiline paragraphs with the > character.
          # When defined this way, all strings end with \n even if only one
          # paragraph was defined
          object.split("\n").map { |s| markdown s }
        else
          markdown object
        end
      elsif object.is_a? Hash
        wrapped_hash = object.map do |key, value|
          [key, wrap_and_render(value)]
        end.to_h

        if is_a_hash_of_hashes? object
          # If it's a hash of hashes, then it's one of the top-level hashes
          # like {google: {url: .., title: ..}, github: {url: .., title: ..}}
          # whose values are OTHER hashes containing the real data
          wrapped_hash
        else
          # If this hash's values are NOT all hashes, then it must be a data
          # hash such as {url: "google.com", title: "Google"}, and we should
          # wrap it in an OpenStruct so it can be accessed with dot notation
          OpenStruct.new wrapped_hash
        end
      else
        raise "Don't know how to wrap or render #{object.inspect}"
      end
    end

    def self.is_a_hash_of_hashes? object
      object.is_a?(Hash) && object.values.all? { |v| v.is_a? Hash }
    end

    def self.markdown str
      # By default, the Markdown HTML renderer wraps everything
      # in <p> tags.  It also appends a \n to the end of every
      # rendered output string.  Since many of the things we're
      # Markdowning are meant to be inline, the <p> tags and \n
      # are stripped out here, leaving the decision to the
      # template(s).
      MARKDOWN.render(str).strip[3...-4]
    end
  end
end
