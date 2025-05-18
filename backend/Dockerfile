
FROM golang:1.24.3-alpine

RUN apk add --no-cache bash git

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY go.mod ./

# TO ADD go.sum
# COPY go.mod go.sum ./
RUN go mod download

COPY . .

EXPOSE 3002

CMD ["air", "-c", ".air.toml"]