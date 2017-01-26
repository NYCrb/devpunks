class Action
  attr_reader :headers, :body, :request

  def initialize(&block)
    @block = block
    @headers = {'Content-Type' => 'application/json'}
  end

  def status(code=200)
    @status ||= code
  end

  def params
    request.params
  end

  def json(payload)
    JSON.dump(payload.to_h)
  end

  def call(env)
    evaluate_body

    @request = Rack::Request.new env

    [status, headers, [body]]
  end

  private

  def evaluate_body
    # "Some 🎩 magik🎩 stuff is happening" - Jan
    @body = instance_eval &@block
  end
end
