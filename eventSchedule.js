const url = require("url")

const http = require("http")
const { STATUS_CODES } = http


const {readFile: readFileAsync} = require("fs").promises

// const {readFileSync, readFile} = require("fs")
const {join} = require("path")

const PORT = process.env.PORT || 3000



const eventSchedule = `
<html>
    <head>
        <style>
            body {
                background-color: #fefae0;
            }

        </style>

        <body>
            <h1> Event Schedule </h1>
            <h2><a href="registration" >Registration</a></p>
            <h2><a href="speakers">Speaking Engagements</h2>
            <h2><a href="breakout">Breakout Session</a></h2>
            <h2><a href="party">After Party</a></h2>

            <h4><a href="/" >Home</h4>
        </body>
</html>
`

const registration  = `
<html>
    <head>
        <style>
            body {
                background-color: #fefae0;
            }
        </style>

        <body>
            <h1>Register your interest for the event on this page</h1>
            <h2>Name: </h2>
            <h2>Payment Option: </h2>

            <h4><a href="/" >Home</h4>
        </body>
</html>
`

const party  = `
<html>
    <head>
        <style>
            body {
                background-color: #fefae0;
            }
        </style>

        <body>
            <h1>Okayyyyy! </h1>
            <h1>Let's PARTY & HAVE FUNNNNN!!!</h1>

            <h4><a href="/" >Home</h4>
        </body>
</html>
`

const eventScheduleListener = function (req, res) {
    res.setHeader("Content-Type", "text/html")

    if (req.method !== "GET") {
        res.statusCode = 405
        res.end(STATUS_CODES[res.statusCode] + `\r\n`)
        return
    }
    
    const { pathname } = url.parse(req.url)

    if (pathname === "/") {
        res.end(eventSchedule)
        return
    }

    if (pathname === "/registration") {
        res.end(registration)
        return
    }

    if (pathname === "/speakers") {
        async function run () {
            const contents = await readFileAsync("speakers.html")

            await res.end(contents)
            return
        }

        run().catch(console.error)
    }

    if (pathname === "/breakout") {

        async function run () {
            const fileName =  join(__dirname, "breakout.html")
            const contents = await readFileAsync(fileName)
            await res.end(contents)
            return
        }

        run().catch(console.error)
    }

    if (pathname === "/party") {
        res.end(party)
        return
    }

    // res.statusCode = 404
    // res.end(STATUS_CODES[res.statusCode] + `\r\n`)
}

const server = http.createServer(eventScheduleListener)

server.listen(PORT)