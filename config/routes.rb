Rails.application.routes.draw do
  resources :todos do
    collection do
      post 'import_todos'
    end
  end

  post 'todos/import_todos', to: 'todos#import_todos'

end
