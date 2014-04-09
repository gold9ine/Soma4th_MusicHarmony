require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/flash'

enable :sessions
set :session_secret, 'e60369436337a26db65d65a7d06c97cb'

set :environment, (ENV['ENV'] || :development)
