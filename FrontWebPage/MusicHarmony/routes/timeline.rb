get '/timeline' do
  # erb :timeline

  @comments = Comment.latest
  @user = User.all
  @projects = Project.find_all_by_PRI_USER_ID(session[:user_id])

  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 0
  session[:menu_tl] = 1
  erb 'timeline/usertimeline'.to_sym
end