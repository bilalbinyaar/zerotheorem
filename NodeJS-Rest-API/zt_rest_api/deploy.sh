GOOGLE_PROJECT_ID=zt-backend-381310
SERVICE_NAME=zt-rest-api-redis
REDIS_HOST=10.138.205.83
REDIS_PORT=6379
VPC_CONNECTOR=zt-vpc-connector

gcloud beta run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --update-env-vars REDIS_IP=$REDIS_HOST,REDIS_PORT=$REDIS_PORT \
  --vpc-connector $VPC_CONNECTOR \
  --project=$GOOGLE_PROJECT_ID