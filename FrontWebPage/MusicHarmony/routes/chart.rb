get '/harmonyChart' do
    @user=User.find_by_id(session[:user_id])
    @project = Project.all 
    @Project_Carousel = Project.limit(36)
  erb 'chart/harmonyChart'.to_sym
end