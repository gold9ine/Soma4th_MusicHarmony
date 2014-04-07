require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/flash'

enable :sessions

set :environment, (ENV['ENV'] || :development)
