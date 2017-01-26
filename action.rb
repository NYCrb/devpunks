class Action
  attr_reader :headers, :body, :request

  def initialize(&block)
    @block = block
    @headers = {'Content-Type' => 'application/json'}
  end

  def call(env)
    @request = Rack::Request.new env

    evaluate_body

    [status, headers, [body]]
  end

  private

  def status(code=200)
    @status ||= code
  end

  def params
    request.params
  end

  def json(payload)
    JSON.dump(payload.to_h)
  end

  def evaluate_body
    # "Some 🎩 magik🎩 stuff is happening" - Jan
    # http://web.stanford.edu/~ouster/cgi-bin/cs142-winter15/classEval.php

    @body = instance_eval &@block
  end
end
