require 'rubygems'
require 'active_record'
require 'bundler/setup'

require 'carrierwave'
require 'carrierwave/orm/activerecord'

require './models/tables'
require 'sinatra'               #shotgun
require 'sinatra/activerecord'

# require "sinatra/base"         #unicorn

ActiveRecord::Base.establish_connection(
  :adapter  => "mysql2",
  :host     => "172.16.100.76",
  :port     => 3306,
  :username => "mh",
  :password => "thak2014",
  :database => "mh"
)

#class MyApp < Sinatra::Base    #unicorn

get '/' do

  erb :index
end

# ////////////////////////////

get '/index1' do
  @new_project = Project.new
  @project = Project.all
  @source = Source.all

  erb :index1
end

get '/index2' do
  @new_project = Project.new
  @project = Project.all
  @source = Source.all

  erb :index2
end

get '/newUploaded' do

  erb :newUploaded
end

get '/harmonyChart' do

  erb :harmonyChart
end

get '/artistRanking' do

  erb :artistRanking
end

get '/recommend' do

  erb :recommend
end

get '/myFavoriteList' do

  erb :myFavoriteList
end

get '/userInfo' do

  erb :userInfo
end

get '/searchResult' do

  erb :searchResult
end

get '/projectInfo' do

  erb :projectInfo
end

# ////////////////////////////

get '/index2' do

  erb :index2
end

get '/newUploaded2' do

  erb :newUploaded2
end

get '/harmonyChart2' do

  erb :harmonyChart2
end

get '/artistRanking2' do

  erb :artistRanking2
end

get '/createProject' do

  erb :createProject
end

get '/myProjectList' do

  erb :myProjectList
end

get '/userInfo2' do

  erb :userInfo2
end

get '/searchResult2' do

  erb :searchResult2
end

get '/projectInfo2' do

  erb :projectInfo2
end

get '/projectEdit' do

  erb :projectEdit
end

# ////////////////////////////

get '/musicPlayer' do

  erb :musicPlayer
end

get '/Audiee' do

  erb :audiee2
end
# ////////////////////////////

post '/new_project' do
  @project = Project.new(params[:project])
  # @projects = Project.new
  # @projects.TITLE = params[:project][:TITLE]
  # @projects.ALBUM_IMAGE_PATH = params[:project][:ALBUM_IMAGE_PATH]
  @project.save!

  # redirect '/'
  redirect 'index2'
end

get '/project/:id/edit' do
  @project = Project.find(params[:id])

  erb :editProject
end

get "/project/:id/destroy" do
  @project = Project.find(params[:id])
  @project.destroy

  # redirect "/"
  redirect 'index2'
end

post '/project/:id' do
  @project = Project.find(params[:id])
  @project.TITLE = params[:project][:TITLE]
  @project.ALBUM_IMAGE_PATH = params[:project][:ALBUM_IMAGE_PATH]
  @project.save!

  redirect '/'
end

get '/project/:id' do
  @project = Project.find(params[:id])
  @new_resource = Source.new
  @resource = Source.all

  erb :projectInfo
end

#end                             #unicorn
