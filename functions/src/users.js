import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('backend-app-node')

export async function createUser (req, res) {
    const { email, password } = req.body
    email = email.toLowerCase()
    const user = await db.collection('users').add({ email, password })
    .catch(err => res.status(500).send(err))
    const token = jwt.sign({ email, id: user.id }, secretKey)
    res.send({ token })
}

export async function loginUser(req, res) {
    const { email, password } = req.body
    email = email.toLowerCase()
    const collection = await db.collection('users')
    .where('email', '==', email)
    .where('password', '==', password)
    .catch(err => res.status(500).send(err))
    const user = collection.docs.map(doc => {
        let thisUser = doc.data()
        thisUser.id = doc.id
        return thisUser
    }) [0]
    const token = jwt.sign({ email: user.email, id: user.id }, secretKey)
    res.send({ token })
}