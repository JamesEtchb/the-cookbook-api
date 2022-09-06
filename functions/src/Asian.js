app.get('/asian', async (req, res) => {
    const result = await asianFood.find().toArray()
    res.send(result)
  })
  app.post('/asian', async (req, res) => {
    await asianFood.insertOne(req.body)
    res.send('New recipe was added succesfully to asian food')
  })