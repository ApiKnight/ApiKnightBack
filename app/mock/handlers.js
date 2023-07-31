const { rest } = require('msw')

export const handlers = [
  rest.get('http://127.0.0.1:7001/v1/mock', (req, res, ctx) => {
    console.log('Received request to /v1/mock endpoint')
    return res(
      ctx.status(200),
      ctx.json({ message: 'I am a mock user' })
    )
  })
]

