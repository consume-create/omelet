import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      description: 'Enter a Headline to automatically split this text block into 2 columns. Otherwise, just fill out the copy field and this will be centered.'
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
});
