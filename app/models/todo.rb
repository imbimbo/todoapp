class Todo < ApplicationRecord
  validates :external_id, uniqueness: true
  validates :title, presence: true
  validates :status, inclusion: { in: ['pendente', 'em andamento', 'concluída'] }
end
