import { defineField, defineType } from 'sanity';
import { OlistIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'stats',
  title: 'Stats',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      validation: [
        Rule => Rule.required().min(1).max(3).error('Please include 1-3 stats')
      ],
      of: [
        {
          name: 'stat',
          title: 'Stat',
          type: 'object',
          icon: OlistIcon,
          fields: [
            defineField({
              name: 'title',
              title: 'title',
              type: 'string',
              validation: [
                Rule => Rule.required()
              ]
            }),
            defineField({
              name: 'copy',
              title: 'Copy',
              type: 'string',
              validation: [
                Rule => Rule.required()
              ]
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'copy'
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      items: 'items'
    },
    prepare({ items }) {
      const label = items.length > 1 ? `${items.length} stats` : `${items.length} stat`;
      return {
        title: items && items.length > 0 ? `Stats (${label})` : 'Stats (missing stats)'
      }
    }
  }
});
