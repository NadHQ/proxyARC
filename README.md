Proxy service with rate limiting


Добавить .env файл в папку proxy и записать туда следующую информацию

TARGET_SERVER='куда будем перенаправлять (https://example.com)'
REDIS_URL='redis://redis:6379/0'
MONGO='mongodb://admin:secret@mongodb:27017'

В папке c docker-compose.yml запустить "docker compose up --build"
