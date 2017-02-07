require 'logger'
require 'sqlite3'
require 'active_record'

class Schema < ActiveRecord::Migration
  def change table
    name = table.to_s.downcase.pluralize

    return if table
      .connection.data_sources.include? name

    create_table name do |t|
      t.string :name
    end
  end
end

# http://blog.bigbinary.com/2015/12/28/application-record-in-rails-5.html
class AbstractRecord < ActiveRecord::Base
  CONNECTION = { adapter: 'sqlite3', database: 'development.sqlite4' }

  # https://github.com/rails/rails/blob/master/activerecord/lib/active_record/inheritance.rb#L122
  self.abstract_class = true

  self.logger = Logger.new (STDOUT)
  self.establish_connection CONNECTION

  # https://ruby-doc.org/core-2.2.0/Class.html#method-i-inherited
  def self.inherited base
    # https://github.com/rails/rails/blob/master/activerecord/lib/active_record/relation/delegation.rb#L26
    super base

    Schema.new.change base
  end
end
