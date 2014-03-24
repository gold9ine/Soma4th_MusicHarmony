require 'rubygems'
require 'active_record'
require 'bundler/setup'

require 'carrierwave'
require 'carrierwave/orm/activerecord'

require './models/tables'
require 'sinatra'               #shotgun
require 'sinatra/activerecord'

require "sinatra/base"         #unicorn

ActiveRecord::Base.establish_connection(
  :adapter  => "mysql2",
  :host     => "172.16.100.76",
  :port     => 3306,
  :username => "mh",
  :password => "thak2014",
  :database => "mh"
)

get '/' do

  erb :index
end

# ////////////////////////////


get '/newUploaded' do

  # erb :newUploaded
  erb :mainRecentSlide
end

# get '/index1' do
#   @new_project = Project.new
#   @project = Project.all
#   @source = Source.all

#   erb :index1
# end

get '/harmonyChart' do

  erb :harmonyChart
end

get '/artistRanking' do

  erb :artistRanking
end

get '/myProjectList' do
  @new_project = Project.new
  @project = Project.all
  @source = Source.all

  erb :my_project_list
end

get '/edit-page' do

  erb :audiee3
end

# ////////////////////////////


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

get '/createProject' do

  erb :createProject
end

get '/projectEdit' do

  erb :projectEdit
end

# ////////////////////////////

get '/musicPlayer' do

  erb :musicPlayer
end


# ////////////////////////////

post '/new_project' do
  @project = Project.new(params[:project])
  # @projects = Project.new
  # @projects.TITLE = params[:project][:TITLE]
  # @projects.ALBUM_IMAGE_PATH = params[:project][:ALBUM_IMAGE_PATH]
  @project.save!

  # redirect '/'
  # erb :index
  # redirect 'myProjectList'
  # redirect 'my_project'
  erb :my_project
end

get '/project/:id/edit' do
  @project = Project.find(params[:id])

  erb :editProject
end

get "/project/:id/destroy" do
  @project = Project.find(params[:id])
  @project.destroy

  # redirect "/"
  # redirect 'myProjectList'
  erb :my_project
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

get '/audiee2' do
  erb :audiee2
end
