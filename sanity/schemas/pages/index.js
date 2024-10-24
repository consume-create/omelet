import { defineField, defineType } from 'sanity';
import { DashboardIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'index',
  title: 'Home',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string'
      // hidden: true,
    }),
    defineField({
      name: 'seoSocial',
      title: 'SEO / Social Sharing',
      type: 'seoSocial'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      validation: [
        Rule => Rule.custom((value) => {
          return value && value.asset ? true : 'Please upload or select an image';
        })
      ],
      options: {
        hotspot: false
      }
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 4,
      validation: [
        Rule => Rule.required()
      ]
    })
  ]
});
