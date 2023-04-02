docker build --no-cache -t pocketbase_0.14.0_linux_amd64 .
docker run -p 8080:8080 --name pocketbase_0.14.0_linux_amd64 -itd pocketbase_0.14.0_linux_amd64:latest &
