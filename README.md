# Wipe Go
Wipe Go is a liteweight user's presence tracker for WhatsApp.

## Requirements
You only need to install [Node 12](https://nodejs.org).

## Install
You need to clone this repository and navigate into that directory
```sh
git clone https://github.com/rajatxs/wipe-go.git wipe-go
```
```sh
cd wipe-go
```

then install required dependencies using your favourite package manager
```sh
npm install
```
or
```sh
yarn install
```

add **.env** file with following variables
```markdown
# nodejs environment either "production" or "development"
NODE_ENV = "development"

# wa session config
SESSION_ROOT = "./"

# database configuration
WIPE_SQLITE_DIR = "./"
```

finally you need to run SQL queries to setup tables in the database
> You can run those queries manually or using built in command

```sh
npm run query subs pres_hist
```
or 
```sh
yarn query subs pres_hist
```

add one subscription into database using
```sh
npm run subs:add <user name> <your target phone>
```
or
```sh
yarn subs:add <user name> <your target phone>
```

## Usage
Once you complete the setup you can run the following command to start WA Socket service

If you did setup the environment globally then you can run 
```sh
npm start
```
or
```sh
yarn start
```

otherwise you can load .env file using 
```sh
npm run start:env
```
or
```sh
yarn start:env
```

> For the first time, you need to connect your WhatsApp by scanning a QR code from the terminal

If it will successfully be connected, the service will start tracking your target number and write history records in the database
