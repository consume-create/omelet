import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  singleton: true,
  icon: HomeIcon,
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
    },
    {
      name: 'team',
      title: 'Team'
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
      name: 'heroVideo',
      title: 'Video',
      type: 'videoLoop'
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
        Rule => Rule.required().unique().error('Must include at least 1 case study')
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }]
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
      name: 'capabilitiesHandwriting',
      title: 'Handwriting',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'capabilities',
      name: 'capabilitiesTags',
      title: 'Tags',
      type: 'array',
      validation: [
        Rule => Rule.required().unique().error('Must include at least 1 tag.')
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'tags' }]
        }
      ]
    }),
    defineField({
      fieldset: 'capabilities',
      name: 'servicesCTA1',
      title: 'CTA',
      type: 'servicesCTA',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'capabilities',
      name: 'servicesCTA2',
      title: 'CTA',
      type: 'servicesCTA',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'team',
      name: 'teamTitle',
      title: 'Title',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'team',
      name: 'members',
      title: 'Members',
      type: 'array',
      validation: [
        Rule => Rule.required().unique().error('Must include at least 1 team member.')
      ],
      of: [
        {
          type: 'teamMember'
        }
      ]
    })
  ]
});
