get '/timeline' do
  # erb :timeline
  erb 'timeline/timeline'.to_sym
end