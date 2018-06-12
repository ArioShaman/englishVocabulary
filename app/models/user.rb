class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  has_many :uservocs
  has_many :vocs, through:  :uservocs, foreign_key: true

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable, 
         :trackable, 
         :validatable
         
  include DeviseTokenAuth::Concerns::User
end
