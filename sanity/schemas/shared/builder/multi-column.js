import { defineField, defineType } from 'sanity';
import { SplitVerticalIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

const ORIENTATIONS = [
  { title: 'Square 1:1', value: 'square' },
  { title: 'Landscape 16:9', value: 'landscape' },
  { title: 'Portrait 9:16', value: 'portrait' }
]

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
    }),
    defineField({
      name: 'orientation',
      title: 'Media Orientations',
      type: 'string',
      options: {
        list: ORIENTATIONS,
        layout: 'radio',
      },
      validation: [
        Rule => Rule.required()
      ]
    })
  ],
  preview: {
    select: {
      images: 'items',
      orientation: 'orientation'
    },
    prepare({ images, orientation }) {
      const label = images.length > 1 ? `${images.length} columns` : `${images.length} column`;
      const orientationOpt = orientation && ORIENTATIONS.flatMap(option => option.value === orientation ? [option.title] : [])
      return {
        title: images && images.length > 0 ? `Multi Column (${label})` : 'Multi Column (missing items)',
        subtitle: orientation ? `${orientationOpt}` : 'No media orientation selected'
      }
    }
  }
});
