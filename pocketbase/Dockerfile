FROM alpine:latest

ARG PB_VERSION=0.14.0

RUN apk add --no-cache \
    unzip \
    # this is needed only if you want to use scp to copy later your pb_data locally
    openssh

# copy PocketBase
COPY ./pocketbase .

EXPOSE 8080

ENV PORT 8080

# start PocketBase
CMD ["/pocketbase", "serve", "--http=0.0.0.0:8080"]