# Career page builder

Create a personiled career page for you company

## Live Demo

- you can check out for live hosted demo at
- https://career-page-builder-nu.vercel.app/

## setup:

### pre requisite

#### with docker

- you will need docker desktop installed in your system
- run this in terminal

```bash
docker compose up -d
```

- This will run a postgres Db in detached mode in you pc

#### without docker

- You can run a data base locally or get it from a postgres DB provider but then you will need you change the value of `DATABASE_URL` in .env

#### copy enviroment varialbes from .env.example file

```bash
# Mac
  cp .env.example .env

# Windows
  copy .env.example .env
```

- `UPLOADTHING_TOKEN` - get your uploadthings token from [uploadthings](https://uploadthing.com/) and update `UPLOADTHING_TOKEN` in the .env file

- note: if you are not using docker you will need to modify `DATABASE_URL` varialbe in `.env` as mentioned above in the pre requisite

#### Install dependencies

```bash
npm install
```

#### push your schema to db

```bash
npx prisma db push
```

#### To start project in dev mode

```bash
npm run dev
```

#### To start the project in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run start
```
