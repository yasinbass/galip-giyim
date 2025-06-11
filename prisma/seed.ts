import { PrismaClient } from '@prisma/client'
import { CATEGORIES } from '../app/constants/categories'

const prisma = new PrismaClient()

async function main() {
  console.log('Veritabanı seed işlemi başlıyor...')

  // Kategorileri ekle
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        name: category.name
      }
    })
  }

  console.log('Kategoriler başarıyla eklendi')
}

main()
  .catch((e) => {
    console.error('Seed işlemi sırasında hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 