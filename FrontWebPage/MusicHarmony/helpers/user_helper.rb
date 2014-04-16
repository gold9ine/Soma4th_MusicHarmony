helpers do
  def logged_in?
    cookies[:user_id] != ""
    session[:user_id] != nil
  end

  def current_user
    @current_user ||= User.find(session[:user_id])
  end
end
