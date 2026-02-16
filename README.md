npm init -y
npx tsc --init

npm i express multer jsonwebtoken bcryptjs dotenv mongoose nodemon bullmq ioredis

npm i -D typescript ts-node @types/node @types/bcryptjs @types/jsonwebtoken @types/mongoose

## Script patterns

```bash
#auto reloads scripts
"dev": "nodemon src/app.ts",
"dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts",

"dev": "ts-node-dev --respawn src/app.ts",
"dev": "ts-node-dev --respawn --transpile-only src/app.ts",

#Single Run script
"dev": "ts-node --transpile-only src/app.ts",
"dev": "ts-node src/app.ts",
```
