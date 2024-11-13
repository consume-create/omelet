import { defineField, defineType } from 'sanity';
import { SplitVerticalIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'multiColumn',
  title: 'Multi Column',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Media',
      type: 'array',
      description: '1-up, 2-up, 3-up columns (1-up will automatically center)',
      validation: [
        Rule => Rule.required().min(1).max(3).error('Please include 1-3 items')
      ],
      of: [
        {
          type: 'singleImage'
        },
        {
          type: 'videoLoop'
        },
        {
          type: 'textColumn'
        }
      ]
    })
  ],
  preview: {
    select: {
      images: 'items'
    },
    prepare({ images }) {
      const label = images.length > 1 ? `${images.length} columns` : `${images.length} column`;
      return {
        title: images && images.length > 0 ? `Multi Column (${label})` : 'Multi Column (missing items)'
      }
    }
  }
});
