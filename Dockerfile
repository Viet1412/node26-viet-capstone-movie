#build image dựa trên image của node
FROM node:18-alpine

#Tạo 1 directory bên trong image để chứa code của ứng dụng 
WORKDIR /app

#Copy toàn bộ code của ứng dụng (dấu chấm đầu tiên) vào bên trong working directory (folder app - dấu chấm tiếp theo)
COPY . .

# Thực thi một câu lệnh bên trong working directory
RUN npm install

# Cho phép quyền thực thi (nếu không cần dùng tới thì comment lại)
#RUN chmod +x wait-for

EXPOSE 4000

CMD ["node", "src/index.js"]

