import React from 'react';
import { defineField, defineType, defineArrayMember } from 'sanity';
import { SlugInput } from 'sanity-plugin-prefixed-slug';
import { ProjectsIcon, UnknownIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: ProjectsIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero'
    },
    {
      name: 'work',
      title: 'Work'
    },
    {
      name: 'overview',
      title: 'Overview'
    }
  ],
  fields: [
    defineField({
      fieldset: 'hero',
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
      description: 'This is also the page title for SEO and seen in the browser tab.',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      components: {
        input: SlugInput,
      },
      description: 'Press "Generate" to automatically create a slug from the title above.',
      options: {
        source: 'title',
        urlPrefix: 'omelet.com/'
      },
      validation: [
        Rule => Rule.required().custom((slug) => {
          if (typeof slug === "undefined") return true;
          const regex = /(^[a-z0-9-]+$)/;
          if (regex.test(slug.current)) {
            return true;
          } else {
            return 'Invalid slug: Only lowercase letters, numbers, and dashes are allowed.'
          }
        })
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
      // validation: [
      //   Rule => Rule.required()
      // ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroMedia',
      title: 'Hero (Image or Video)',
      type: 'array',
      validation: [
        Rule => Rule.required().length(1).error('Please select either an image or a video')
      ],
      of: [
        {
          type: 'singleImage'
        },
        {
          type: 'videoLoop'
        }
      ]
    }),
    defineField({
      fieldset: 'work',
      options: { columns: 2 },
      name: 'ctaTags',
      title: 'CTA Tags',
      type: 'object',
      validation: [
        Rule => Rule.required()
      ],
      fields: [
        defineField({
          name: 'categoryTag',
          title: 'Category',
          type: 'reference',
          to: [{ type: 'tags' }]
        }),
        defineField({
          name: 'industryTag',
          title: 'Industry',
          type: 'reference',
          to: [{ type: 'industryTags' }]
        })
      ]
    }),
    defineField({
      fieldset: 'overview',
      name: 'overview',
      title: 'Text Block',
      type: 'object',
      validation: [
        Rule => Rule.required()
      ],
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'text',
          rows: 2,
          validation: [
            Rule => Rule.required()
          ]
        }),
        defineField({
          name: 'richtext',
          title: 'Copy',
          validation: [
            Rule => Rule.required()
          ],
          type: 'array',
          of: [{
            type: 'block',
            styles: [],
            lists: [],
            marks: {
              decorators: [
                { title: 'Bold', value: 'strong' },
                { title: 'Italic', value: 'em' }
              ],
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'External link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL',
                      validation: Rule => Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                      })
                    }
                  ]
                }
              ]
            }
          }]
        })
      ]
    }),
    defineField({
      fieldset: 'overview',
      name: 'tags',
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
      name: 'blocks',
      title: 'Builder Blocks',
      type: 'array',
      of: [
        {
          type: 'textBlock'
        },
        {
          type: 'pullQuote'
        },
        {
          type: 'singleImage'
        },
        {
          type: 'videoLoop'
        },
        {
          type: 'videoPlayer'
        },
        {
          type: 'carousel'
        },
        {
          type: 'mediaGrid'
        },
        {
          type: 'multiColumn'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      hero: 'heroMedia'
    },
    prepare({ title, slug, hero }) {
      let video_thumb = false,
          new_thumb = UnknownIcon;

      if (hero && hero[0].image) {
        new_thumb = hero[0].image.asset;
      } else if (hero && hero[0].vimeo) {
        video_thumb = true;
        new_thumb = hero[0].vimeo.pictures.sizes[1].link.replace('?r=pad', '') + '?r=rpad';
      }

      return {
        title: title ? title : 'Untitled',
        subtitle: slug ? `omelet.com/${slug.current}` : 'untitled',
        media: video_thumb ? <img src={new_thumb} alt={title} /> : new_thumb
      };
    }
  }
});
