class Action
  attr_reader :headers, :body, :request

  def initialize &block
    @block = block
    @status = 200
    @headers = {'Content-Type' => 'text/html'}
    @body = ''
  end

  def status value = nil
    value ? @status = value : @status
  end

  def params
    request.params
  end

  def call(env)
    @request = Rack::Request.new env
    @body = self.instance_eval &@block
    [status, headers, [body]]
  end

end
