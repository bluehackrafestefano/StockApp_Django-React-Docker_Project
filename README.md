# Stock App Django - React - Docker Project

## Needs

- Docker or Docker Desktop installed to your computer

## Project Structure

```
project
├─ api
│  ├─ account
│  ├─ main
│  ├─ manage.py
│  ├─ requirements.txt
│  └─ stock
├─ client
│   ├─ package.json
│   ├─ public
│   ├─ src
│   └─ yarn.lock
├─ docker-compose.yml
└─ nginx
   ├─ Dockerfile
   └─ nginx.conf
```

## Steps to spin up

- Clone this repo;
```git
git clone https://github.com/bluehackrafestefano/StockApp_Django-React-Docker_Project.git
```

- Create `.env` file under `api/` directory;
```
SECRET_KEY=django-insecure-%s0ghghfdsomestoogd53847
POSTGRES_NAME=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
DJANGO_LOG_LEVEL=DEBUG
ENV_NAME=PROD
```

- Change `ENV_NAME` variable to `DEV` if you want to test with DEBUG=True and sqlite3 database.

- Build and run with Docker-Compose;
```
docker compose up
```

- Test endpoints;
  - [Django Endpoints](http://localhost/stock/)
  - [Django Admin Dashboard](http://localhost/admin/login/?next=/admin/)
  - [React](http://localhost:81)

- Tear down resources;
```
docker compose down -v
docker system prune -a
```
