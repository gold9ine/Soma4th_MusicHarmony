get '/userInfo' do
  # erb :userInfo
  erb 'project/userInfo'.to_sym
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

  # puts params[:user][:COMFIRM].inspect != params[:user][:PASSWORD].inspect
  # if params[:user][:COMFIRM] != params[:user][:PASSWORD]
  #   form = erb('user/form'.to_sym, :layout => false)
  #   {:status => 'failure', :form => form}.to_json
  # end

  if @user.save
    session[:user_id] = @user.id
    {:status => 'success', :redirect_to => '/'}.to_json
  else
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
  cookies[:user_id] = ""

  redirect '/user'
end

get '/user' do
  session[:user_id] = nil
  cookies[:user_id] = ""
	erb 'user/form'.to_sym
end