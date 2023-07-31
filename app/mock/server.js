const { setupServer } = require('msw/node')
const { handlers } = require('./handlers')

module.exports = {
  listen() {
    console.log('Starting MSW server...')
    const server = setupServer(...handlers)
    return server.listen({ onUnhandledRequest: 'bypass' })
      .then(() => console.log('MSW server started'))
      .catch(err => console.error('MSW server failed to start', err))
  }
}
