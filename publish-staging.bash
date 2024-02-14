set -e
docker buildx build --platform linux/amd64 . -t client-linux
docker tag client-linux us-docker.pkg.dev/streamflows/gcr.io/client-linux:staging
docker push us-docker.pkg.dev/streamflows/gcr.io/client-linux:staging