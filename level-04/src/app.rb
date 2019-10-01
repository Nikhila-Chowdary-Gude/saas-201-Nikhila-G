require 'sinatra'
#Todoapp class conatins methods for getting,adding,updating and deleting
class Todosapp

def get_todos
  @@id ||=0
  @@todos ||= {}
end

def add_todo(todo,date)
  @@id+=1
  get_todos()[@@id]=[todo,date]
end

def get_todo(id)
  get_todos()[id]
end

def update_todo(id,title)
  get_todos()[id][0]=title
end

def delete_todo(id)
  get_todos().delete(id)
end

end

#Todosapp object to invoke class methods
todo_obj=Todosapp.new

get "/todos" do
  @todos =todo_obj.get_todos()
  erb :todos
end

get "/todos/:id" do
  @id = params[:id].to_i
  @todo = todo_obj.get_todo(@id)
  erb :todo
end

post "/todos" do
  #Allow if title is not empty
  if params[:title].strip!=""
  todo_obj.add_todo(params[:title],params[:date])
  end
redirect "/todos"
end

put "/todos/:id" do
  @id=params[:id].to_i
  todo_obj.update_todo(@id,params[:title])
  redirect "/todos"
end

delete "/todos/:id" do
  @id=params[:id].to_i
  todo_obj.delete_todo(@id)
  redirect "/todos"
end