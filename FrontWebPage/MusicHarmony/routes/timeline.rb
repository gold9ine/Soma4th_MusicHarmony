get '/timeline' do
  # erb :timeline
  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 0
  session[:menu_tl] = 1
  erb 'timeline/usertimeline'.to_sym
end