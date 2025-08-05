// express
import app from "./app.js"

// Values
import {APP_PORT} from "./config.js"

// To dev
app.listen(APP_PORT, () => {
    console.log(
        `\nSERVER: home services running correctly on the following app_port \n \n service routes:  \n http://localhost:${APP_PORT}\n`
    )
})

// start dev server
// ts-node src/server.ts
