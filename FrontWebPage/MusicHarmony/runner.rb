# Development: bundle exec ruby runner.rb
# Production: ENV=production bundle exec ruby runner.rb
# Production: ENV=production bundle exec shotgun runner.rb
require './config/sinatra'
require './config/carrierwave'
require './config/database'
require './config/bcrypt'
require './config/php'

require './uploaders/image_uploader'
require './uploaders/sound_uploader'

require './models/comment'
require './models/meta'
require './models/project'
require './models/reply'
require './models/sound'
require './models/source'
require './models/user'

require './helpers/user_helper'

require './routes/_test.rb'
require './routes/chart.rb'
require './routes/comment.rb'
require './routes/edit.rb'
require './routes/project.rb'
require './routes/rank.rb'
require './routes/source.rb'
require './routes/timeline.rb'
require './routes/user.rb'



get '/' do
  # erb :harmonyChart
  # session[:user_id]="NickName"

  if logged_in?
    erb 'chart/harmonyChart'.to_sym
  else
    redirect '/user'
  end
  
end