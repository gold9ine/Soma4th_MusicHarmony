# js에서 쓰는 get, 가운데 컨텐츠만 바뀜
get '/my_project' do
   @new_project = Project.new 
   @project = Project.find_all_by_PRI_USER_ID(session[:user_id])
   @source = Source.find_all_by_PRI_USER_ID(session[:user_id])
  erb 'project/my_project'.to_sym
end

get '/projectInfo' do
  erb 'project/projectInfo'.to_sym
end

post '/new_project' do
  @project = Project.new(params[:project])
  @project.PRI_USER_ID=session[:user_id]
  @project.save!

  redirect '/my_project'
end


get "/project/:id/destroy" do
  @project = Project.find(params[:id])
  @project.destroy

  redirect '/my_project'
end

get '/project/:id/edit' do
  @project = Project.find(params[:id])
  # erb :editProject
  erb 'project/editProject'.to_sym
end

get '/project/:id' do
  @project = Project.find(params[:id])
  @sources = Source.find_all_by_PROJECT_NUM(@project.id)
  @comments = Comment.find_all_by_PROJECT_NUM(@project.id)
  @replies = Reply.all

  erb 'project/projectInfo'.to_sym
end
