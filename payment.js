const express = require('express')
const app = express()

const redis = require('redis')

;(async () => {
  const client = redis.createClient()

  const subscriber = client.duplicate()

  await subscriber.connect()

  await subscriber.subscribe('orderSystem', (channel, message) => {
    console.log('Receive channel ', channel)
    console.log('Receive message ', message)
  })
})()

app.listen(3001, () => {
  console.log(`The server is running 3000`)
})
