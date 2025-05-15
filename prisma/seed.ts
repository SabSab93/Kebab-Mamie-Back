import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.kebab.createMany({
    data: [
      {
        name: 'Classic Kebab',
        description: 'Viande d’agneau, légumes frais, sauce blanche maison',
        price: 8.5,
        img: '/images/kebab1.jpg',
      },
      {
        name: 'Kebab Poulet',
        description: 'Poulet grillé, crudités croquantes, sauce moutarde douce',
        price: 8.0,
        img: '/images/kebab2.jpg',
      },
      {
        name: 'Végé Kebab',
        description: 'Falafels croustillants, houmous, salade, sauce citronnée',
        price: 7.5,
        img: '/images/kebab3.jpg',
      },
    ],
    skipDuplicates: true,
  })
  console.log('Seed terminé.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
