json.array! @users do |user|
  json.id user.id
  json.name user.name
end
if @new_message.present? 
  json.array! @new_message 
end