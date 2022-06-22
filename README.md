# ovn_web
## 准备
npm install
## 生产环境
npm run build
拷贝public文件到生产环境下，设置nginx静态文件路径指向public即可
## 测试环境
  npm run build:mock
  同时执行mock数据，ng sever,通过http://localhost:4200 访问web
  
