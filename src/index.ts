import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// GET / → liste des kebabs
app.get('/', async (_req, res) => {
  try {
    const kebabs = await prisma.kebab.findMany()
    res.json(kebabs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🚀 Server up on port ${port}`)
})
