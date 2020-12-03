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
