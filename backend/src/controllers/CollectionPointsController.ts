import { Request, Response } from 'express'
import connection from '../../database/connection'

import keyable from '../utils/keyable'

class CollectionPointsController {
  async create (req: Request, res: Response) {
    const { collectionPoint } = req.body
    const key = keyable

    // TODO: check uniques (key, whatsapp, email)

    const trx = await connection.transaction()

    const addresses = await trx('addresses').insert({
      street: collectionPoint.address.street,
      number: collectionPoint.address.number,
      complement: collectionPoint.address.complement,
      city: collectionPoint.address.city,
      state: collectionPoint.address.state,
      country: collectionPoint.address.country,
      latitude: collectionPoint.address.latitude,
      longitude: collectionPoint.address.longitude
    }).returning('id').catch(error => {
      console.log(error)

      return []
    })

    if (!addresses[0]) return res.status(422).json({ error: 'Invalid address' })

    const collectionPoints = await trx('collection_points').insert({
      key,
      address_id: addresses[0],
      name: collectionPoint.name,
      nickname: collectionPoint.nickname
        ? collectionPoint.nickname
        : collectionPoint.name.split(' ')[0],
      whatsapp: collectionPoint.whatsapp,
      email: collectionPoint.email,
      password: collectionPoint.password,
      image_base64: collectionPoint.imageBase64
    }).returning('id').catch(error => {
      console.log(error)
      return []
    })

    if (!collectionPoints[0]) return res.status(422).json({ error: 'Error on Collection Point data' })

    await trx('collection_point_recyclabes').insert(
      collectionPoint.recyclabes.map((recyclabeId: number) => {
        return {
          collection_point_id: collectionPoints[0],
          recycling_type_id: recyclabeId
        }
      })
    ).catch(error => {
      console.log(error)
      trx.commit()

      return res.status(422).json({ error: 'Error on Collection Point recyclabes' })
    })

    await trx.commit()

    return res.status(201).json(
      {
        key
      }
    )
  }

  async index (req: Request, res: Response) {
    const { city, state, recycables } = req.query

    const parsedRecycables = String(recycables).split(',').map(item => Number(item.trim()))

    // TODO: apply filters (city, state and recycables) on query
    const collectionPoints = await connection('collection_points').select('*')
    const total = await connection('collection_points').count('*').first() || 0

    const count = total ? total.count : 0
    res.header('X-Total-Count', count.toString())

    // TODO: is nedeed to serialize address and recycables on this response json?

    return res.json(collectionPoints)
  }

  async show (req: Request, res: Response) {
    const collectionPointKey = req.params.key
    const collectionPoint = await connection('collection_points').select('*')
      .where({ key: collectionPointKey }).first()

    if (!collectionPoint) return res.status(404).json({ error: 'Not found' })

    const address = await connection('addresses').select('*')
      .where({ id: collectionPoint.address_id }).first()

    const recyclables = await connection('recycling_types')
      .join('collection_point_recyclabes',
        'recycling_types.id', 'collection_point_recyclabes.recycling_type_id')
      .where('collection_point_recyclabes.collection_point_id', collectionPoint.id)

    return res.json({
      collection_point: {
        key: collectionPoint.key,
        name: collectionPoint.name,
        nickname: collectionPoint.nickname,
        imageBase64: collectionPoint.image_base64,
        email: collectionPoint.email,
        whatsapp: collectionPoint.whatsapp,
        recycables: recyclables.map(recyclable => {
          return {
            id: recyclable.id,
            description: recyclable.description,
            image_url: `/assets/${recyclable.description}`
          }
        }),
        address: {
          street: address.street,
          number: address.number,
          complement: address.complement,
          city: address.city,
          state: address.state,
          country: address.country,
          latitude: address.latitude,
          longitude: address.longitude
        }
      }
    })
  }

  // //TODO: Need a model called collectionPoint to get id prop
  // async update (req: Request, res: Response) {
  //   const authorization = req.headers.authorization;
  //   const collectionPointKey = req.params.key;

  //   const collectionPointAsToken = await connection('collection_points').select('*')
  //     .where({ key: authorization });

  //   if (!collectionPointAsToken) return res.status(401).json({ error: 'Not authorized' });

  //   const collectionPoint = await connection('collection_points').select('*')
  //     .where({ key: collectionPointKey });

  //   if (!collectionPoint) return res.status(404).json({ error: 'Not found' });

  //   if (collectionPointAsToken.id !== collectionPoint.id) {
  //     return res.status(403).json({ error: 'Forbidden' })

  // }

  // // TODO: how to patch?
  // async patch (req: Request, res: Response) {

  // }

  // //TODO: Need a model called collectionPoint to get id prop
  // async delete (req: Request, res: Response) {
  //   const authorization = req.headers.authorization
  //   const collectionPointKey = req.params.key

  //   const organizationAsToken = await connection('collection_points').select('*')
  //     .where({ key: authorization })

  //   if (!collectionPointAsToken) return res.status(401).json({ error: 'Not authorized' })

  //   const collectionPoint = await connection('collection_points').select('*')
  //     .where({ key: collectionPointKey });

  //   if (!collectionPoint) return res.status(404).json({ error: 'Not found' })

  //   if (collectionPointAsToken.id !== collectionPoint.id) {
  //     return res.status(403).json({ error: 'Forbidden' })
  //   }

  //   await connection('collection_points').delete().where({ key: collectionPointKey })

  //   return res.status(204).send();
  // }
}

export default CollectionPointsController
