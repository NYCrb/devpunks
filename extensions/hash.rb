class Hash
  def symbolize_keys!
    keys
      .each {|key| self[key.to_sym] = delete(key) }
  end
end
