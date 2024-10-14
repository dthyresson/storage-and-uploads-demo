import { db } from 'api/src/lib/db'
import { storage } from 'api/src/lib/storage'
import randomColor from 'randomcolor'
import sharp from 'sharp'

export default async () => {
  try {
    // delete all posts
    await db.post.deleteMany()

    // create some posts
    const posts = await db.post.createMany({
      data: [
        {
          title: 'The Joy of Decluttering',
          content:
            'Decluttering is the first step towards an organized life. It involves letting go of items that no longer serve a purpose or bring joy. By simplifying our surroundings, we create space for what truly matters.',
        },
        {
          title: 'Maximizing Small Spaces',
          content:
            'Small spaces can be transformed into functional havens with clever storage solutions. Utilize vertical space with shelving and wall-mounted organizers. Multi-functional furniture pieces are key to making the most of limited square footage.',
        },
        {
          title: 'The Art of Categorization',
          content:
            'Effective organization starts with proper categorization. Group similar items together to create a logical system. This approach not only makes finding things easier but also helps maintain order in the long run.',
        },
        {
          title: 'Sustainable Storage Solutions',
          content:
            'Eco-friendly storage options are becoming increasingly popular. Repurpose old items like mason jars or wooden crates for stylish storage. Choosing sustainable materials for new organizers helps reduce our environmental impact while keeping our spaces tidy.',
        },
        {
          title: 'Digital Organization Techniques',
          content:
            'In the digital age, virtual clutter can be just as overwhelming as physical mess. Implement a consistent file naming system and folder structure on your devices. Regular backups and cloud storage solutions ensure your digital life stays organized and secure.',
        },
      ],
    })

    console.info(`\n  ${posts.count} posts created\n`)

    const allPosts = await db.post.findMany()

    const width = 1024
    const height = 512

    for (const post of allPosts) {
      const bgColor = randomColor({ luminosity: 'light' })
      const watermarkColor = randomColor({ luminosity: 'dark' })

      const watermark = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="72 " width="72" fill="${watermarkColor}">
        <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z" />
      </svg>
      `

      const svgText = `
      <svg width="${width}" height="${height}">
        <style>
          .title { fill: ${watermarkColor}; font-size: 48px; font-weight: bold; font-family: 'Arial', sans-serif; }
        </style>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="title">${post.title}</text>
      </svg>`

      const image = await sharp({
        create: {
          width,
          height,
          channels: 4,
          background: bgColor,
        },
      })
        .composite([
          {
            input: Buffer.from(svgText),
            gravity: 'center',
          },
          {
            input: Buffer.from(watermark),
            gravity: 'northwest',
            top: 20,
            left: 20,
          },
        ])
        .png()
        .toBuffer()

      const imageFile = new File([image], `${post.id}.png`, {
        type: 'image/png',
      })

      await db.post.update({
        where: { id: post.id },
        data: {
          ogImage: await storage.findAdapter('og').writeFile(imageFile),
        },
      })
    }

    console.info('\n  OG images created for all posts\n')

    console.info(
      '\n  No seed data, skipping. See scripts/seed.ts to start seeding your database!\n'
    )
  } catch (error) {
    console.error(error)
  }
}
