# Inventory Microservice


## Dev
1. Clone the repository
2. Install dependencies
3. create a file `.env` like `env.template`
4. tener levanados los microservicios que se van a consumir
5. execute `npm run start:dev`

## Nats
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats