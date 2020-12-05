### introduction 
> this awesome app and [this website]() match each other.
## create a server

 - [ ] create a simple server

- [ ] Connect to the database

#### technology stack used

1. import Typescript
2. install [MongoDB](https://www.mongodb.com/try/download/community)

docker 开启 redis mysql mongodb

> docker run -d --name myredis -p 6379:6379 redis --requirepass "123456"

> docker run -di -p 1101:3306 -v /Users/gaojianbo/Documents/docker_data/mysql/conf.d -v /Users/gaojianbo/Documents/docker_data/mysql/data -e MYSQL_ROOT_PASSWORD=123456 --name gao_mysql mysql

> docker run -itd --name mongo -p 27017:27017 mongo --auth 
> 坑：同时使用mysql引入了egg-sequelize和mongodb时，sequelize与mongoose的冲突。冲突在model层。因为他们默认构建model都是在app\model下,当两个都往这里构建时就冲突了,[ctx.modal冲突了](https://blog.csdn.net/qq_42036203/article/details/94005419)
