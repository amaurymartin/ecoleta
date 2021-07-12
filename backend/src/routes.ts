import express from 'express'
import multer from 'multer'
import { celebrate, Joi } from 'celebrate'

import multerConfig from './config/multer'
import SessionsController from './controllers/SessionsController'
import CollectionPointsController from './controllers/CollectionPointsController'
import RecyclingTypesController from './controllers/RecyclingTypesController'

const routes = express.Router()
const upload = multer(multerConfig)

const sessionsController = new SessionsController()
const collectionPointsController = new CollectionPointsController()
const recyclingTypesController = new RecyclingTypesController()

// Healthcheck
routes.get('/healthcheck', (_req, res) => {
  res.status(204).send()
})

// Sessions resource
// routes.post('/sessions', sessionsController.create)

// CollectionPoints resource
routes.post(
  '/collection-points',
  upload.single('imageBase64'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      nickname: Joi.string().optional(),
      whatsapp: Joi.string().required().min(10).max(11), //FIXME: this is a brazilian verification
      email: Joi.string().required().email(),
      recyclables: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().optional(),
      city: Joi.string().required(),
      state: Joi.string().required().max(2), //FIXME: this is a brazilian verification?
      country: Joi.string().optional(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    })
  }, {
    abortEarly: false
  }),
  collectionPointsController.create
)
routes.get('/collection-points', collectionPointsController.index)
routes.get('/collection-points/:key', collectionPointsController.show)
// routes.put('/collection-points/:key', collectionPointsController.update);
// routes.patch('/collection-points/:key', collectionPointsController.patch);
// routes.delete('/collection-points/:key', collectionPointsController.delete);

// RecyclingTypes resource
routes.get('/recycling-types', recyclingTypesController.index)

export default routes
