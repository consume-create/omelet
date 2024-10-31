import { defineField, defineType } from 'sanity';
import { DashboardIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'index',
  title: 'Home',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero'
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      hidden: true
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: false
      }
    })
  ]
});
