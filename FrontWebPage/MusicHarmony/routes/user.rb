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
  
  if @user.save
    session[:user_id] = @user.id
    cookies[:user_id] = @user.id
    {:status => 'success', :redirect_to => '/'}.to_json
  else

    if(params[:user][:EMAIl] == nil)
      puts "asdf"
      session[:error_email] = 1;
    elsif (params[:user][:PART] == nil)
      session[:error_PART] = 1;
    end
      
    form = erb('user/form'.to_sym, :layout => false)
    {:status => 'failure', :form => form}.to_json
  end
end


post '/login' do
  @user = User.find_by_EMAIL(params[:user][:EMAIL])

  if @user != nil
    if @user.PASSWORD == BCrypt::Engine.hash_secret(params[:user][:PASSWORD], @user.SALT)
      session[:user_id] = @user.id
      
      if params["remember-me"] == "on" 

        cookies[:user_id] = @user.id
      end

      redirect "/"

    else
      #raise "login fail!"
      erb 'layout/error'.to_sym
    end
  else
    erb 'layout/error'.to_sym
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