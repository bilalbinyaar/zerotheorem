docker build -t node-docker-project .
docker tag node-docker-project gcr.io/zt-backend-381310/caching-utility-redis
docker push gcr.io/zt-backend-381310/caching-utility-redis