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
    },
    {
      name: 'overview',
      title: 'Overview'
    },
    {
      name: 'work',
      title: 'Work'
    },
    {
      name: 'capabilities',
      title: 'Capabilities'
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
    }),
    defineField({
      fieldset: 'overview',
      name: 'overviewTitle',
      title: 'Title',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'overview',
      name: 'overviewSubtitle',
      title: 'Subtitle',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'overview',
      name: 'overviewSubcopy',
      title: 'Copy',
      type: 'text',
      rows: 6,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'work',
      name: 'workTitle',
      title: 'Title',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ],
    }),
    defineField({
      fieldset: 'work',
      name: 'caseStudies',
      title: 'Work',
      type: 'array',
      validation: [
        Rule => Rule.required().unique().error('Must include at least 1 case study!')
      ],
      of: [
        {
          type: 'reference',
          to: {
            type: 'caseStudy'
          }
        }
      ]
    }),
    defineField({
      fieldset: 'capabilities',
      name: 'capabilitiesTitle',
      title: 'Title',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'capabilities',
      name: 'capabilitiesList',
      title: 'Capabilities',
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
    })
  ]
});
