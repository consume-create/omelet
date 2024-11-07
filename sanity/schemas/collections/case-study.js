import { defineField, defineType, defineArrayMember } from 'sanity';
import { SlugInput } from 'sanity-plugin-prefixed-slug';
import { EditIcon, UnknownIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
      // validation: [
      //   Rule => Rule.required()
      // ]
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
    })
    // defineField({
    //   name: 'blocks',
    //   title: 'Page Builder Blocks',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'textBlock'
    //     },
    //     {
    //       type: 'pullQuote'
    //     },
    //     {
    //       type: 'singleImage'
    //     },
    //     {
    //       type: 'slideshow'
    //     },
    //     {
    //       type: 'singleVideo'
    //     },
    //     {
    //       type: 'colorSplash'
    //     }
    //   ]
    // })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      thumb: 'heroImage'
    },
    prepare({ title, slug, thumb }) {
      return {
        title: title ? title : 'Untitled',
        subtitle: slug ? `omelet.com/${slug.current}` : 'untitled',
        media: thumb ? thumb.asset : UnknownIcon
      };
    }
  }
});
