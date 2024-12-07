import type { CollectionConfig } from 'payload'

export const AppUsers: CollectionConfig = {
  slug: 'app-users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
