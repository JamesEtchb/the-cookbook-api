app.get('/african', async (req, res) => {
    const result = await africanFood.find().toArray()
    res.send(result)
  })
  app.post('/african', async (req, res) => {
    await africanFood.insertOne(req.body)
    res.send('New recipe was added succesfully to african food')
  })