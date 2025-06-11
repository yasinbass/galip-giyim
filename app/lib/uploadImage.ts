import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadImage(file: File): Promise<string> {
  try {
    // Dosyayı base64 formatına çevir
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Data = buffer.toString('base64')
    const fileType = file.type
    const dataURI = `data:${fileType};base64,${base64Data}`

    // Cloudinary'ye yükle
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload(dataURI, {
        folder: 'products',
      }, (error, result) => {
        if (error) reject(error)
        else resolve(result as { secure_url: string })
      })
    })

    return result.secure_url
  } catch (error) {
    console.error('Görsel yüklenirken hata:', error)
    throw new Error('Görsel yüklenemedi')
  }
} 