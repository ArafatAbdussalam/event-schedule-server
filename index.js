const http = require("http")


const hint = `
[
    {
        "topics ": ["NodeJs", "servers", "http module"]
    },
    {
        "function ": {
            "requests": "works with specific routes and methods",
            "responds": "works with http status code"
        }
    }
]
`



const requestListener = function (req, res) {
    if (req.url ===  "/" || req.url === "/text" ) {
        res.setHeader("Content-Type", "text/html")
        res.end("This is a simple text. Notice how it differs from others")
    }

    if (req.url === "/topic") {
        res.setHeader("Content-Type", "application/json")
        res.end(hint)
    }
}

const server = http.createServer(requestListener)

server.listen(3000, () => {
    console.log("This server works successfully")
})