import * as Express from 'express'
import { convertNumberToWord } from './number-to-word'

const app: Express.Application = Express()

let lastNumber: string

app.post('/POST/:number', (req: Express.Request, res: Express.Response) => {
    const numberToConvert = Number(req.params.number)
    if (!numberToConvert) {
        return res.sendStatus(400)
    }

    lastNumber = convertNumberToWord(numberToConvert)
    res.sendStatus(204)
})

app.get('/GET', (req: Express.Request, res: Express.Response) => {
    if (lastNumber) {
        res.send(lastNumber)
    } else {
        res.sendStatus(404)
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})