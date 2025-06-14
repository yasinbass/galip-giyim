import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Kategori ekle
  const category = await prisma.category.create({
    data: {
      name: 'Tişört',
    },
  })

  // Ürün ekle
  await prisma.product.create({
    data: {
      name: 'Basic Tişört',
      description: 'Pamuklu beyaz tişört',
      price: 199.99,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
      categoryId: category.id,
    },
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 