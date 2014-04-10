get '/userInfo' do
  # erb :userInfo
  erb 'project/userInfo'.to_sym
end

post '/regist' do
  @user = User.new

  @user.email = params[:user][:email]
  @user.salt = BCrypt::Engine.generate_salt
  @user.password = BCrypt::Engine.hash_secret(params[:user][:password], @user.salt)
  @user.name = params[:user][:name]

  @user.save!
  session[:user_id] = @user.id
  erb '/'
  # if @user.save
  #   session[:user_id] = @user.id
  #   {:status => 'success', :redirect_to => '/'}.to_json
  # else
  #   form = erb('users/form/register'.to_sym, :layout => false)
  #   {:status => 'failure', :form => form}.to_json
  # end
end


post '/login' do
  @user = User.find_by_email(params[:user][:email])

  if @user != nil
    if @user.password == BCrypt::Engine.hash_secret(params[:user][:password], @user.salt)
      session[:user_id] = @user.id
      redirect "/"
    else
      #raise "login fail!"
      erb 'layout/error'.to_sym
    end
  else
    erb 'layout/error'.to_sym
  end

end

delete '/logout' do
  session[:user_id] = nil

  redirect '/'
end

get '/user' do
	erb 'user/form'.to_sym
end