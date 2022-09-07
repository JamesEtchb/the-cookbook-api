import functions from 'firebase-functions'
import { MongoClient } from 'mongodb'
import express from 'express'
import cors from 'cors'
import { createUser, loginUser } from './src/User.js'
import { getPersonal, createPersonal, updatePersonal, deletePersonal } from './src/Personal.js'
import 'dotenv/config'

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('backend-app-node')

const food = db.collection('food')
const latinFood = db.collection('latin')
const northAmericanFood = db.collection('north-american')
const europeanFood = db.collection('european')
const asianFood = db.collection('asian')
const africanFood = db.collection('african')
const personalFood = db.collection('personal')

client.connect()

console.log('Mongo connected')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/users', createUser)
app.post('/users/login', loginUser)

//landing page
app.get('/', async (req, res) => {
  const result = await food.find().toArray()
  res.send(result)
})

//latin
app.get('/latin', async (req, res) => {
  const result = await latinFood.find().toArray()
  res.send(result)
})
app.post('/latin', async (req, res) => {
  await latinFood.insertOne(req.body)
  res.send('New recipe was added succesfully to latin food')
})

//north-american
app.get('/north-american', async (req, res) => {
  const result = await northAmericanFood.find().toArray()
  res.send(result)
})
app.post('/north-american', async (req, res) => {
  await northAmericanFood.insertOne(req.body)
  res.send('New recipe was added succesfully to north american food')
})

//european
app.get('/european', async (req, res) => {
  const result = await europeanFood.find().toArray()
  res.send(result)
})
app.post('/european', async (req, res) => {
  await europeanFood.insertOne(req.body)
  res.send('New recipe was added succesfully to european food')
})

//asian
app.get('/asian', async (req, res) => {
  const result = await asianFood.find().toArray()
  res.send(result)
})
app.post('/asian', async (req, res) => {
  await asianFood.insertOne(req.body)
  res.send('New recipe was added succesfully to asian food')
})

//african
app.get('/african', async (req, res) => {
  const result = await africanFood.find().toArray()
  res.send(result)
})
app.post('/african', async (req, res) => {
  await africanFood.insertOne(req.body)
  res.send('New recipe was added succesfully to african food')
})

//personal cookbook
app.get('/personal', getPersonal)
app.post('/personal', createPersonal)
app.patch('/personal/:personalId', updatePersonal)
app.delete('/personal/:personalId', deletePersonal)

// app.listen(3333, () => console.log('api listening on port 3333'))
export const api = functions.https.onRequest(app)
