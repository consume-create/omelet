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
      name: 'tags',
      title: 'Tags'
    },
    {
      name: 'footer',
      title: 'Footer'
    },
    {
      name: 'contact',
      title: 'Contact'
    },
    {
      name: 'socials',
      title: 'Socials'
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
      fieldset: 'tags',
      name: 'tags',
      title: 'Tags',
      type: 'array',
      validation: [
        Rule => Rule.required()
      ],
      of: [
        {
          type: 'string',
          validation: [
            Rule => Rule.required()
          ]
        }
      ]
    }),
    defineField({
      fieldset: 'footer',
      name: 'footerTitle',
      title: 'Title',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'footer',
      name: 'generalLabel',
      title: 'General Label',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'footer',
      name: 'businessLabel',
      title: 'Business Label',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'contact',
      name: 'generalEmail',
      title: 'General Email',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'contact',
      name: 'businessEmail',
      title: 'Business Email',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'contact',
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'contact',
      name: 'addressLink',
      title: 'Address Link',
      type: 'url',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'contact',
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    // defineField({
    //   fieldset: 'contact',
    //   name: 'address',
    //   title: 'Address',
    //   type: 'array',
    //   of: [{
    //     type: 'block',
    //     styles: [],
    //     lists: [],
    //     marks: {
    //       decorators: []
    //     }
    //   }]
    // }),
    defineField({
      fieldset: 'socials',
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    }),
    defineField({
      fieldset: 'socials',
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url'
    })
  ]
});
