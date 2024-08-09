# app/services/json_placeholder_service.rb
require 'net/http'
require 'json'
require 'uri'

class JsonPlaceholderService
  BASE_URL = 'https://jsonplaceholder.typicode.com'

  def fetch_todos
    uri = URI("#{BASE_URL}/todos")
    response = Net::HTTP.get(uri)
    JSON.parse(response)
  end
end
