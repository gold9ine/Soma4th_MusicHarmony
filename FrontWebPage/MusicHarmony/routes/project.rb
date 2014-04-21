# js에서 쓰는 get, 가운데 컨텐츠만 바뀜
get '/my_project' do
   @new_project = Project.new 
   @project = Project.find_all_by_PRI_USER_ID(session[:user_id])
   @source = Source.find_all_by_PRI_USER_ID(session[:user_id])
  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 1
  session[:menu_tl] = 0
  erb 'project/my_project'.to_sym
end

get '/projectInfo' do
  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 1
  session[:menu_tl] = 0
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
  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 1
  session[:menu_tl] = 0
  erb 'project/editProject'.to_sym
end

get '/project/:id' do
  @project = Project.find(params[:id])
  @sources = Source.find_all_by_PROJECT_NUM(@project.id)
  @comments = Comment.find_all_by_PROJECT_NUM(@project.id)
  @replies = Reply.all
  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 1
  session[:menu_tl] = 0
  erb 'project/projectInfo'.to_sym
end

get '/create-project' do
  @new_project = Project.new 
  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 1
  session[:menu_tl] = 0
  erb 'project/create-project'.to_sym
end