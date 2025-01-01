import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { Product } from './Product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, Product],
}
