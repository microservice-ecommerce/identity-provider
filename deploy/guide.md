```
 docker build -t highbar -f deploy/Dockerfile .

 docker run --env-file .env.production.highbar -p 3002:3002 --name identity-provider ngocphupham/identity-provider

```

docker run --name identity-provider --env-file .env.production.highbar --network=highbar -p 3002:3002 ngocphupham/identity-provider
docker run --name redis-highbar --network=highbar -p 6378:6379 -d redis
docker run --name some-mysql --network=highbar -e MYSQL_ROOT_PASSWORD=123@ -e MYSQL_DATABASE=H3IdentityProviderDB  -p 3307:3306 -d mysql 
