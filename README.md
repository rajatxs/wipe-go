# Wipe Go 🚀
Wipe Go is a liteweight user's presence tracker for WhatsApp.

## Requirements
You only need to install [Node 12](https://nodejs.org).

## Install
You need to run following command to install `wipe` tool globally:
```sh
npm i -g @rxpm/wipe
```

Once it's done, you can verify it using 
```sh
wipe -v
```

Initially you need to run setup script to perform database migration
```sh
wipe setup
```

## Usage
To add new subscription
```sh
wipe subs add --alias <add alias here> --phone <phone number> 
```

Now use this command to start core service
```sh
wipe go
```

> For the first time, you need to connect your WhatsApp by scanning a QR code from the terminal

If it will successfully be connected, the service will start tracking your target number and write history records in the database
