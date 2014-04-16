post '/new_comment/:id' do
  @project = Project.find(params[:id])
  @comment = Comment.new
  @comment.CONTENTS = params[:comment][:CONTENTS]
  @comment.PROJECT_NUM = params[:id]
  @comment.PRI_USER_ID = session[:user_id]
  @comment.save!

  @comments = Comment.all
  @sources = Source.all
  #raise @comment.PROJECT_NUM.inspect
  redirect back
end

get '/delete_comment/:project_id/:comment_id' do
  @comment = Comment.find(params[:comment_id])
  @comment.destroy
  
  @project = Project.find(params[:project_id])
  @comments = Comment.all
  @sources = Source.all

  redirect back
end