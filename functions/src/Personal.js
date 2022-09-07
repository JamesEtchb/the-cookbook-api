import jwt from 'jsonwebtoken'
import 'dotenv/config'
import secretKey from '../secret.js'

export async function getPersonal(req, res) {
  const token = req.headers.authorization
  const user = jwt.verify(token, secretKey)
  const client = new MongoClient(process.env.MONGO_URI)
  const db = client.db('backend-app-node')
  const collection = await db
    .collection('personal')
    .where('userId', '==', user.id)
    .get()
    .catch((err) => res.status(500).send(err))
  const personal = collection.docs.map((doc) => {
    let personals = doc.data()
    personals.id = doc.id
    return personals
  })
  res.send(personal)
}

export async function createPersonal(req, res) {
  const token = req.headers.authorization
  let newPersonal = req.body
  const user = jwt.verify(token, secretKey)
  if (!newPersonal || !newPersonal.personal || !user) {
    res.status(400).send({ success: false, message: 'Invalid request' })
    return
  }
  newPersonal.userId = user.id
  const client = new MongoClient(process.env.MONGO_URI)
  const db = client.db('backend-app-node')
  await db
    .collection('personal')
    .add(newPersonal)
    .catch((err) => res.status(500).send(err))
  res.status(201)
  getPersonal(req, res)
}

export async function updatePersonal(req, res) {
  const personalUpdate = req.body
  const { personalId } = req.params
  const client = new MongoClient(process.env.MONGO_URI)
  const db = client.db('backend-app-node')
  await db.collection('personal').doc(personalId).update(personalUpdate)
  .catch(err => res.status(500).send(err))
  res.status(202)
  getPersonal(req, res)
}

export function deletePersonal(req, res) {
  const { personalId } = req.params
  res.status(203).send('Personal Deleted')
}