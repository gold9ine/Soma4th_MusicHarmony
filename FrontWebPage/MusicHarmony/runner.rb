require 'sinatra'
require "sinatra/activerecord"
require 'active_record'

get '/' do

  erb :index
end