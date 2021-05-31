import { Request, Response } from 'express'
import connection from '../../database/connection'

class SessionsController {
  async create (req: Request, res: Response) {
    const { email, password } = req.headers

    const collectionPoint = await connection('collection_points').select('*')
      .where({ email, password }).first()

    if (!collectionPoint) return res.status(401).json({ error: 'Not authorized' })

    return res.status(201).json(collectionPoint)
  }
}

export default SessionsController
