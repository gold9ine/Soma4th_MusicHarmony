# js에서 쓰는 get, 가운데 컨텐츠만 바뀜
get '/myProjectList' do
  @new_project = Project.new
  @project = Project.all
  @source = Source.all

  erb "content/my_project_list".to_sym
end



get '/projectInfo' do
  erb :projectInfo
end

post '/new_project' do
  @project = Project.new(params[:project])
  @project.save!

  redirect 'my_project'
end

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

get '/project/:id' do
  @project = Project.find(params[:id])
  @sources = Source.all
  @comments = Comment.all


  erb :projectInfo
end
