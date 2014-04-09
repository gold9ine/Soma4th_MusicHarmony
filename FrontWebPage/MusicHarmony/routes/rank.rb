get '/artistRanking' do
  # erb :artistRanking
  erb 'rank/artistRanking'.to_sym
end