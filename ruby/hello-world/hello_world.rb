module HelloWorld
  def hello(name = "World")
    "Hello, #{name}!"
  end

  module_function :hello
end