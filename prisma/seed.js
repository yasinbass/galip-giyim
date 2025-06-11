const { PrismaClient } = require('@prisma/client')

const CATEGORIES = [
  { id: 1, name: 'Pantolon' },
  { id: 2, name: 'Tişört' },
  { id: 3, name: 'Gömlek' },
  { id: 4, name: 'Ceket' },
  { id: 5, name: 'Mont' },
  { id: 6, name: 'Şort' },
  { id: 7, name: 'Şapka' },
  { id: 8, name: 'Ayakkabı' }
]

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