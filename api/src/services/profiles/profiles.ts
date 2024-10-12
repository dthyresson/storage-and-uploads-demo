import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { storage } from 'src/lib/storage'

import { createThumbnail } from '../demo8'
export const profiles: QueryResolvers['profiles'] = () => {
  return db.profile.findMany({
    include: { avatars: { orderBy: { variant: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
}
export const profile: QueryResolvers['profile'] = ({ id }) => {
  return db.profile.findUnique({
    where: { id },
    include: { avatars: { orderBy: { variant: 'asc' } } },
  })
}

export const createProfile: MutationResolvers['createProfile'] = async ({
  input,
}) => {
  const { avatar, ...rest } = input
  const file = avatar[0]

  if (!file) {
    throw new ValidationError('No avatar provided')
  }

  const { name, type, size } = file
  const reference = await storage.writeFile(file)

  // create thumbnail avatar
  const thumbnail = await createThumbnail(file, 'thumbnail')
  const thumbnailReference = await storage.writeFile(thumbnail)

  // create medium avatar
  const medium = await createThumbnail(file, 'medium')
  const mediumReference = await storage.writeFile(medium)

  return await db.profile.create({
    data: {
      ...rest,
      avatars: {
        create: [
          {
            name,
            type,
            size,
            reference,
            variant: 'original',
            demo: 'profile',
          },
          {
            name: thumbnail.name,
            type: thumbnail.type,
            size: thumbnail.size,
            reference: thumbnailReference,
            variant: 'thumbnail',
            demo: 'profile',
          },
          {
            name: medium.name,
            type: medium.type,
            size: medium.size,
            reference: mediumReference,
            variant: 'medium',
            demo: 'profile',
          },
        ],
      },
    },
    include: { avatars: true },
  })
}
