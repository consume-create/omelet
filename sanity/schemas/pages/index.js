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
    })
  ]
});
