get '/ajax-example.php' do
  # php 'php/ajax-example.php'.to_sym
  # php_output = `php index.php`
  # exec 'php ajax-example.php'
end


post '/search' do
  @searchKey = params[:project][:search]
  # @search_result = User.joins('FULL OUTER JOIN projects ON projects.PRI_USER_ID = users.id')
  # @search_result_artist = User.joins('LEFT OUTER JOIN projects ON projects.NAME = @searchKey')
  # @search_result_project = Project.joins('LEFT OUTER JOIN projects ON projects.PRI_USER_ID = users.id')
  # @search_query = "select users.* from users LEFT OUTER JOIN projects ON projects.PRI_USER_ID = users.id;"
  # @records_array = ActiveRecord::Base.connection.execute(@search_query)
  @search_result_project= Project.where(TITLE: @searchKey)
  @search_result_user= User.where(NAME: @searchKey)

  # raise @search_result_user.inspect
  
  session[:menu_hc] = 0
  session[:menu_ar] = 0
  session[:menu_mp] = 0
  session[:menu_tl] = 0
  erb "search/search-result".to_sym
end