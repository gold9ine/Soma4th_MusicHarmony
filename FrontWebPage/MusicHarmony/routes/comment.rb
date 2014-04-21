post '/new_comment/:id' do
  @project = Project.find(params[:id])
  @comment = Comment.new
  @comment.CONTENTS = params[:comment][:CONTENTS]
  @comment.project_id = params[:id]
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

post '/new_reply/:project_id/:comment_id' do
  @reply = Reply.new
  @reply.comment_id = params[:comment_id]
  @reply.PRI_USER_ID = session[:user_id]
  @reply.CONTENTS = params[:reply][:CONTENTS]
  
  if @reply.save
    redirect back
  else
  end
end

get '/delete_reply/:comment_id/:reply_id' do
  @reply = Reply.find(params[:reply_id])
  @reply.destroy

  redirect back
end