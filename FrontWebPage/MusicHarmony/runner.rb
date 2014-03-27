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

# js에서 쓰는 get, 가운데 컨텐츠만 바뀜
get '/myProjectList' do
  @new_project = Project.new
  @project = Project.all
  @source = Source.all

  erb "content/my_project_list".to_sym
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
  # @comments = Comment.all
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

  redirect 'my_project'
end

post '/new_comment/:id' do
  @project = Project.find(params[:id])
  # @comment = Comment.new(params[:comment])
  # @source = Source.new
  @comment = Comment.new
  @comment.CONTENTS = params[:comment][:CONTENTS]
  @comment.PROJECT_NUM = params[:id]
  @comment.save!

  @comments = Comment.all
  @sources = Source.all
  # redirect '/project/:id'
  erb :projectInfo
end

post '/add_track/:id' do
  @project = Project.find(params[:id])
  # @comment = Comment.new
  @source = Source.new(params[:source])
  # @source = Source.new
  # @source.SOURCE_PATH = params[:source][:SOURCE_PATH]
  @source.PROJECT_NUM = params[:id]
  @source.save!

  @comments = Comment.all
  @sources = Source.all
  erb :projectInfo
end

get '/delete_comment/:project_id/:comment_id' do
  @comment = Comment.find(params[:comment_id])
  @comment.destroy
  
  @project = Project.find(params[:project_id])
  @comments = Comment.all
  @sources = Source.all

  erb :projectInfo
end

get '/delete_source/:project_id/:source_id' do
  @source = Source.find(params[:source_id])
  @source.destroy
  
  @project = Project.find(params[:project_id])
  @comments = Comment.all
  @sources = Source.all

  erb :projectInfo
end
# get 'my_project' do
#    @new_project = Project.new 
#    @project = Project.all 
#    @source = Source.all 

#    erb :my_project


get '/my_project' do
   @new_project = Project.new 
   @project = Project.all 
   @source = Source.all 
  erb :my_project
end

get "/project/:id/destroy" do
  @project = Project.find(params[:id])
  @project.destroy

  redirect 'my_project'
end

get '/project/:id/edit' do
  @project = Project.find(params[:id])

  erb :editProject
end

# post '/project/:id' do
#   @project = Project.find(params[:id])
#   @project.TITLE = params[:project][:TITLE]
#   @project.ALBUM_IMAGE_PATH = params[:project][:ALBUM_IMAGE_PATH]
#   @project.save!

#   redirect '/'
# end

get '/project/:id' do
  @project = Project.find(params[:id])
  # @new_sound = Sound.new
  # @sound = Sound.all
  # @new_resource = Source.new
  @sources = Source.all
  # @resource = Source.all
  # @new_comment = Comment.new
  @comments = Comment.all


  erb :projectInfo
end



get '/audiee2' do
  erb :audiee2
end
