docker build -t node-docker-project .
docker tag node-docker-project gcr.io/zt-frontend-381310/zt-frontend
docker push gcr.io/zt-frontend-381310/zt-frontend