FROM golang:1.19.0-alpine3.16 AS builder

WORKDIR /usr/src/app

COPY go.mod go.sum ./

RUN go mod download && go mod verify

COPY . .

RUN mkdir bin

RUN go build -o ./bin/backend ./cmd/main.go

# Copy it the app to an alpine
FROM alpine:3.11.3

WORKDIR /app

COPY --from=builder /usr/src/app/bin/backend ./

EXPOSE 3000

CMD ["./backend"]
