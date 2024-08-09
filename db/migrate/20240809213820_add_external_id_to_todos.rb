class AddExternalIdToTodos < ActiveRecord::Migration[7.1]
  def change
    add_column :todos, :external_id, :integer
  end
end
