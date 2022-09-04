import functions from 'firebase-functions'
import { MongoClient } from 'mongodb'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const client = new MongoClient(process.env.MONGO_URI)
const database = client.db('backend-app-node')

const food = database.collection('food')
const latinFood = database.collection('latin')
const northAmericanFood = database.collection('north-american')
const europeanFood = database.collection('european')
const asianFood = database.collection('asian')
const africanFood = database.collection('african')
const personalFood = database.collection('personal')

client.connect()

console.log('Mongo connected')

const app = express()
app.use(cors())
app.use(express.json())

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
function getPersonal() {
  app.get('/personal', async (req, res) => {
    const result = await personalFood.find().toArray()
    res.send(result)
  })
}
app.get('/personal', async (req, res) => {
  const result = await personalFood.find().toArray()
  res.send(result)
})
app.post('/personal', async (req, res) => {
  await personalFood.insertOne(req.body)
  res.send('New recipe was added succesfully to personal cookbook')
  getPersonal(req, res)
})

app.listen(3333, () => console.log('api listening on port 3333'))
export const api = functions.https.onRequest(app)
