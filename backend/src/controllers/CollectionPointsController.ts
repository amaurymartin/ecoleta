import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import connection from '../../database/connection'

class CollectionPointsController {
  async create (req: Request, res: Response) {
    const collectionPoint = req.body
    const key = uuidv4()

    // TODO: check uniques (key, whatsapp, email)
    const trx = await connection.transaction()

    const addresses = await trx('addresses').insert({
      street: collectionPoint.street,
      number: collectionPoint.number,
      complement: collectionPoint.complement,
      city: collectionPoint.city,
      state: collectionPoint.state,
      country: collectionPoint.country,
      latitude: collectionPoint.latitude,
      longitude: collectionPoint.longitude
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
      image_base64: req.file? req.file.filename : null
    }).returning('id').catch(error => {
      console.log(error)
      return []
    })

    if (!collectionPoints[0]) return res.status(422).json({ error: 'Error on Collection Point data' })

    await trx('collection_point_recyclables').insert(
      collectionPoint.recyclables
        .split(',')
        .map((recyclableId: string) => Number(recyclableId.trim()))
        .map((recyclableId: number) => {
          return {
            collection_point_id: collectionPoints[0],
            recycling_type_id: recyclableId
          }
        })
    ).catch(error => {
      console.log(error)
      trx.commit()

      return res.status(422).json({ error: 'Error on Collection Point recyclables' })
    })

    await trx.commit()

    return res.status(201).json(
      {
        key
      }
    )
  }

  async index (req: Request, res: Response) {
    // TODO: Add pagination
    const { city, state, recyclables } = req.query

    const parsedRecyclables = recyclables
      ? String(recyclables).split(',').map(item => Number(item.trim()))
      : []

    const collectionPoints = await connection('collection_points')
      .join('collection_point_recyclables',
        'collection_points.id', 'collection_point_recyclables.collection_point_id')
      .modify(function (qb) {
        if (parsedRecyclables.length > 0) {
          qb.whereIn('collection_point_recyclables.recycling_type_id', parsedRecyclables)
        }
      })
      .join('addresses', 'collection_points.address_id', 'addresses.id')
      .modify(function (qb) {
        if (city) qb.where('city', String(city))
      })
      .modify(function (qb) {
        if (state) qb.where('state', String(state))
      })
      .distinct()
      .select(['collection_points.*', 'addresses.*'])

    const count = collectionPoints.length || 0
    res.header('X-Total-Count', count.toString())

    return res.json(
      {
        collectionPoints: collectionPoints.map(collectionPoint => {
          return {
            key: collectionPoint.key,
            name: collectionPoint.name,
            nickname: collectionPoint.nickname,
            // TODO: To test mobile app, change URI to expo endpoint:
            // imageUri: `http://192.168.0.5:3001/uploads/${collectionPoint.image_base64}`,
            imageUri: `/uploads/${collectionPoint.image_base64}`,
            email: collectionPoint.email,
            whatsapp: collectionPoint.whatsapp,
            address: {
              street: collectionPoint.street,
              number: collectionPoint.number,
              complement: collectionPoint.complement,
              city: collectionPoint.city,
              state: collectionPoint.state,
              country: collectionPoint.country,
              latitude: collectionPoint.latitude,
              longitude: collectionPoint.longitude
            }
          }
        })
      }
    )
  }

  async show (req: Request, res: Response) {
    const collectionPointKey = req.params.key
    const collectionPoint = await connection('collection_points').select('*')
      .where({ key: collectionPointKey }).first()

    if (!collectionPoint) return res.status(404).json({ error: 'Not found' })

    const address = await connection('addresses').select('*')
      .where({ id: collectionPoint.address_id }).first()

    const recyclables = await connection('recycling_types')
      .join('collection_point_recyclables',
        'recycling_types.id', 'collection_point_recyclables.recycling_type_id')
      .where('collection_point_recyclables.collection_point_id', collectionPoint.id)

    return res.json({
      collectionPoint: {
        key: collectionPoint.key,
        name: collectionPoint.name,
        nickname: collectionPoint.nickname,
        // TODO: To test mobile app, change URI to expo endpoint:
        // imageUri: `http://192.168.0.5:3001/uploads/${collectionPoint.image_base64}`,
        imageUri: `/uploads/${collectionPoint.image_base64}`,
        email: collectionPoint.email,
        whatsapp: collectionPoint.whatsapp,
        recyclables: recyclables.map(recyclable => {
          return {
            id: recyclable.id,
            description: recyclable.description,
            // TODO: To test mobile app, change URI to expo endpoint:
            // imageUri: `http://192.168.0.5:3001/assets/${recyclable.description}.svg`,
            imageUri: `/assets/${recyclable.description}.svg`
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
