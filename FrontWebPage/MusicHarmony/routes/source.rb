post '/add_track/:id' do
  @project = Project.find(params[:id])
  @source = Source.new(params[:source])
  @source.PROJECT_NUM = params[:id]
  @source.save!

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