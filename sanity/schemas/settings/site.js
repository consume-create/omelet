import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  singleton: true,
  icon: CogIcon,
  fieldsets: [
    {
      name: 'footer',
      title: 'Footer'
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'This defines the title of your site and appears in the browser tab and search engine results',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'footer',
      name: 'footerTitle',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      fieldset: 'footer',
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url'
    }),
    defineField({
      fieldset: 'footer',
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    })
  ]
});
