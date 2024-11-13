import { defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'carousel',
  title: 'Carousel',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'slides',
      title: 'Media',
      type: 'array',
      description: 'Carousel is 16:9 (media best at 1920 x 1080)',
      validation: [
        Rule => Rule.required().min(2).max(5).error('Please include 2-5 slides')
      ],
      of: [
        {
          type: 'singleImage'
        },
        {
          type: 'videoLoop'
        },
        {
          type: 'videoPlayer'
        }
      ]
    })
  ],
  preview: {
    select: {
      images: 'slides'
    },
    prepare({ images }) {
      return {
        title: images && images.length > 1 ? `Carousel (${Object.keys(images).length} slides)` : 'Carousel',
        media: ImagesIcon
      }
    }
  }
});
