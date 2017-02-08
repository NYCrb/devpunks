class Action
  attr_reader :headers, :body, :request

  def initialize &block
    @block = block
    @headers = Hash.new # {'Content-Type' => 'application/json'}
  end

  def call env
    # https://github.com/rack/rack/blob/master/test/spec_request.rb
    @request = Rack::Request.new(env)

    evaluate_body

    [status, headers, [body]]
  end

  def status code=200
    @status ||= code
  end

  def params
    request.params
      .tap { |r| r.symbolize_keys! }
  end

private

  def evaluate_body
    # "Some 🎩 🐰 magik🎩🐰 stuff is happening" - Jan
    # http://web.stanford.edu/~ouster/cgi-bin/cs142-winter15/classEval.php

    @body = instance_eval &@block
  end
end
