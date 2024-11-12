import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'singleImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: [
        Rule => Rule.custom((value) => {
          return value && value.asset ? true : 'Please upload or select an image';
        })
      ],
      options: {
        hotspot: false
      }
    })
  ],
  preview: {
    select: {
      image: 'image.asset',
      title: 'image.asset.originalFilename'
    },
    prepare: ({ image, title }) => {
      return {
        media: image ? image : ImageIcon,
        title: image ? title : 'Must select an image'
      }
    }
  }
});
