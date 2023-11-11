import express from "express"
import http from "node:http"
import bodyParser from "body-parser"
import { signupRouter } from "./signupRouter.js"
import { loginRouter } from "./loginRouter.js"
import { studentRouter } from "./studentRouter.js"
import { deanRouter } from "./deanRouter.js"

const app = express()
export const server = http.createServer(app)

app.use(bodyParser.json())
app.use(signupRouter)
app.use(loginRouter)
app.use(studentRouter)
app.use(deanRouter)

