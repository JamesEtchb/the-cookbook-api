import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { secretKey } from '../secret'
import { app } from 'firebase-admin'

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('backend-app-node')


app.post('/login', (req, res) => {
    const { email, password } = req.body
    let user = users.find(user => user.email === email && user.password === password)
    if (!user) {
        res.status(401).send({ error: 'Invalid email or password' })
        return
    }
    user.password = undefined
    const token = jwt.sign(user, secretKey, { expiresIn: 'Id' })
    res.send({ token })
})

app.get('/private', (req, res) => {
    const token = req.headers.authorization || ''
    if (!token) {
        res.status(401).send({ error: 'You must be logged in to see this'})
        return
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: 'You must use a valid token to see this' + err})
            return
        }
        res.send({ message: `Welcome ${decoded.email}`})
    })
})
