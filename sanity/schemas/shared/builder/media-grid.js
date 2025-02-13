import { defineField, defineType } from 'sanity';
import { DashboardIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'mediaGrid',
  title: 'Media Grid',
  type: 'object',
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Media',
      type: 'array',
      description: 'Tall side best at 4:5, two stacked at 16:9',
      validation: [
        Rule => Rule.required().length(3).error('Please include 3 images and/or videos')
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
      images: 'items'
    },
    prepare({ images }) {
      let imgs = 0,
          vids = 0;

      images.forEach((item) => {
        if (item._type === 'singleImage') {
          imgs++;
        }
        if (item._type === 'videoLoop') {
          vids++;
        }
      });

      const imgs_label = imgs > 0 ? `${imgs} image${imgs > 1 ? 's' : ''}` : '';
      const vids_label = vids > 0 ? `${vids} video${vids > 1 ? 's' : ''}` : '';
      const comma = vids > 0 ? ', ': '';
      const label = `${imgs_label}${comma}${vids_label}`;

      return {
        title: images && images.length === 3 ? `Media Grid (${label})` : 'Media Grid (missing items)'
      }
    }
  }
});
