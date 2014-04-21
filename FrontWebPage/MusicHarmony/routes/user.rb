get '/my_info' do
  @user = User.find_by_id(session[:user_id])
  @project = Project.find_all_by_PRI_USER_ID(session[:user_id])
  @source = Source.find_all_by_PRI_USER_ID(session[:user_id])

  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 0
  session[:menu_tl] = 0

  erb 'user/my_info'.to_sym
end

get '/user_info/:id' do
  @user = User.find_by_id(params[:id])
  @project = Project.find_all_by_PRI_USER_ID(session[:user_id])
  @source = Source.find_all_by_PRI_USER_ID(session[:user_id])

  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 0
  session[:menu_tl] = 0

  erb 'user/user_info'.to_sym
end

post '/regist' do
  @user = User.new

  @user.EMAIL = params[:user][:EMAIL]
  @user.SALT = BCrypt::Engine.generate_salt
  @user.PASSWORD = BCrypt::Engine.hash_secret(params[:user][:PASSWORD], @user.SALT)
  @user.NAME = params[:user][:NAME]
  @user.PART = params[:user][:PART]

  # @user.save!
  # cookies[:user_id] = @user.id
  # redirect '/'

  unless params[:user][:COMFIRM] == params[:user][:PASSWORD]
    form = erb('user/form'.to_sym, :layout => false)
    {:status => 'failure', :form => form}.to_json
  end

  if @user.save
    session[:user_id] = @user.id
    session[:user_nick_name] = @user.NAME
    cookies[:user_id] = @user.id
    {:status => 'success', :redirect_to => '/'}.to_json
  else
    raise @user.error        
    form = erb('user/form'.to_sym, :layout => false)
    {:status => 'failure', :form => form}.to_json
  end
end


post '/login' do
  @user = User.find_by_EMAIL(params[:user][:EMAIL])

  if @user != nil
    if @user.PASSWORD == BCrypt::Engine.hash_secret(params[:user][:PASSWORD], @user.SALT)
      if params["remember-me"] == "on" 
        cookies[:user_id] = @user.id
      end
      session[:user_id] = @user.id
      session[:user_nick_name] = @user.NAME
      redirect "/"
    
    else
      #raise "login fail!"
      session[:login_fail] = "1";
      redirect "/user"
    end
  else
    session[:login_fail] = "1";
    redirect "/user"
  end

end

get '/logout' do
  session[:user_id] = nil
  session[:user_nick_name] = nil
  cookies[:user_id] = ""

  redirect '/user'
end

get '/user' do
  session[:mode] = 0
  session[:user_id] = nil
  session[:user_nick_name] = nil
  cookies[:user_id] = ""
	erb 'user/form'.to_sym
end