get '/artistRanking' do
    session[:menu_hc] = 0
    session[:menu_ar] = 1
    session[:menu_mp] = 0
    session[:menu_tl] = 0
  erb 'rank/artistRanking'.to_sym
end