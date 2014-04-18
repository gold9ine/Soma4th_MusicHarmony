get '/timeline' do
  # erb :timeline
  @comments = Comment.all
  @user = User.all
  @projects = Project.find_all_by_PRI_USER_ID(session[:user_id])
  erb 'timeline/usertimeline'.to_sym
end