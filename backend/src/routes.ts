
import express from 'express'
import SessionsController from './controllers/SessionsController'
import CollectionPointsController from './controllers/CollectionPointsController'
import RecyclingTypesController from './controllers/RecyclingTypesController'

const routes = express.Router()

const sessionsController = new SessionsController()
const collectionPointsController = new CollectionPointsController()
const recyclingTypesController = new RecyclingTypesController()

// Healthcheck
routes.get('/healthcheck', (_req, res) => {
  res.status(204).send()
})

// Sessions resource
routes.post('/sessions', sessionsController.create)

// CollectionPoints resource
routes.post('/collection-points', collectionPointsController.create)
routes.get('/collection-points', collectionPointsController.index)
routes.get('/collection-points/:key', collectionPointsController.show)
// routes.put('/collection-points/:key', collectionPointsController.update);
// routes.patch('/collection-points/:key', collectionPointsController.patch);
// routes.delete('/collection-points/:key', collectionPointsController.delete);

// RecyclingTypes resource
routes.get('/recycling-types', recyclingTypesController.index)

export default routes
