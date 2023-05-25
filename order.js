const express = require('express')
const app = express()

const redis = require('redis')

const publisher = redis.createClient()

app.get('/', async (req, res) => {
  const order = {
    userId: 1,
    products: [
      {
        productId: 1,
        price: 1000,
      },
      {
        productId: 2,
        price: 2000,
      },
    ],
  }

  await publisher.connect()

  publisher.publish('orderSystem:123', JSON.stringify(order)) // bọc JSON.stringify(order) để giảm tải băng thông
  //publish to service Payment.js and sendEmail.js

  return res.json({
    status: 'success',
    message: 'order success!',
  })
})

app.listen(3000, () => {
  console.log(`The server is running 3000`)
})
