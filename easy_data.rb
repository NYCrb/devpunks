require "yaml"
require "ostruct"

require "./markdown"

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
# For all strings, EasyData runs the string through a Markdown HTML renderer so
# we can easily include formatting anywhere in the site data.

module DevPunks
  module EasyData
    TRANSFORMS = [
      # PHASE 1 - Transforms that change the enumerability of objects
      [String, -> obj { obj.include?("\n") ? obj.split("\n") : obj }],

      # PHASE 2 - Recursion into enumerable objects
      [Hash  , -> obj { obj.map { |k, v| [k, transform(v)] }.to_h } ],
      [Array , -> obj { obj.map { |v| transform(v) } }              ],

      # PHASE 3 - Transforms that improve the format/usability of objects
      [Hash  , -> obj { hash_to_data_object(obj) }                  ],
      [String, -> obj { DevPunks::Markdown.render_inline(obj) }     ]
    ]

    def self.[] *files
      files.reduce({}) do |hash, file|
        hash.merge transformed_data_from(File.join("data", file + ".yaml"))
      end
    end

    def self.transformed_data_from file
      YAML.load_file(file).reduce({}) do |hash, (key, value)|
        hash.merge key => transform(value)
      end
    end

    def self.transform object
      TRANSFORMS.reduce(object) do |obj, (type, transform)|
        obj.is_a?(type) ? transform.call(obj) : obj
      end
    end

    def self.hash_to_data_object hash
      if hash.all? { |_, v| v.is_a?(Hash) || v.is_a?(OpenStruct) }
        # If this hash's values are all Hashes or OpenStructs, then it must be
        # a nested hash for organizing data objects, and it should be left as a
        # Hash so it can be enumerated by loops in the view
        hash
      else
        OpenStruct.new hash
      end
    end
  end
end
