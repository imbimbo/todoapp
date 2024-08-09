class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos
  def index
    @todos = Todo.all
    render json: @todos
  end

  # GET /todos/:id
  def show
    render json: @todo
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/:id
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/:id
  def destroy
    @todo.destroy
  end

  def import_todos
    service = JsonPlaceholderService.new
    todos = service.fetch_todos

    todos.each do |todo_data|
      # Ensure the data matches the schema
      Todo.find_or_create_by(external_id: todo_data['id']) do |todo|
        todo.title = todo_data['title']
        todo.description = 'Imported from JSONPlaceholder'
        todo.status = todo_data['completed'] ? 'concluída' : 'pendente'
      end
    end

    render json: { message: 'Todos imported successfully' }, status: :ok
  rescue StandardError => e
    render json: { error: 'Error importing todos', details: e.message }, status: :unprocessable_entity
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :description, :status, :external_id)
  end
end
