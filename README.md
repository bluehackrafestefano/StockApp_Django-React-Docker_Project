# Stock App Django - React - Docker Project

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