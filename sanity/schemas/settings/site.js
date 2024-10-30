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
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      name: 'seoSocial',
      title: 'SEO / Social Sharing',
      type: 'seoSocial'
    }),
    defineField({
      fieldset: 'footer',
      name: 'footerTitle',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      fieldset: 'footer',
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    }),
    defineField({
      fieldset: 'footer',
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url'
    })
  ]
});
