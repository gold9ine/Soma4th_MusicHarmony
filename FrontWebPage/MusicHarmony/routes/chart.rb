get '/harmonyChart' do
    @user=User.find_by_id(session[:user_id])
    # @project = Project.all 
    @Project_Carousel = Project.last(36)

    # raise session[:mode].inspect
    session[:menu_hc] = 1
    session[:menu_ar] = 0
    session[:menu_mp] = 0
    session[:menu_tl] = 0
  erb 'chart/harmonyChart'.to_sym
end