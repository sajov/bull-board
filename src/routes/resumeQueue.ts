import { Request, RequestHandler, Response } from 'express-serve-static-core'
import { BullBoardQueues } from '../@types/app'

export const resumeQueue: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { bullBoardQueues } = req.app.locals as {
      bullBoardQueues: BullBoardQueues
    }
    const { queueName } = req.params
    const { queue } = bullBoardQueues[queueName]

    if (!queue) {
      return res.status(404).send({
        error: 'Queue not found',
      })
    }

    await queue.resume()

    return res.sendStatus(204)
  } catch (e) {
    return res.status(500).send({
      error: 'queue error',
      details: e.stack,
    })
  }
}
