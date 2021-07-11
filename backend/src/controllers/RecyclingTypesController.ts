import { Request, Response } from 'express'
import connection from '../../database/connection'

class RecyclingTypesController {
  async index (_req: Request, res: Response) {
    const recyclingTypes = await connection('recycling_types').select('*')
    const total = await connection('recycling_types').count('*').first()

    const count = total ? total.count : 0
    res.header('X-Total-Count', count.toString())

    const serializedRecyclingTypes = recyclingTypes.map(recyclingType => {
      return {
        id: recyclingType.id,
        description: recyclingType.description,
        // TODO: To test mobile app, change URI to expo endpoint:
        // imageUri: `http://192.168.0.5:3001/assets/${recyclingType.description}.svg`
        imageUri: `/assets/${recyclingType.description}.svg`
      }
    })

    return res.json(serializedRecyclingTypes)
  }
}

export default RecyclingTypesController
