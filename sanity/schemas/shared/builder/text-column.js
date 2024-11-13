import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'textColumn',
  title: 'Text Column',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'richtext',
      title: 'Text Column',
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
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  type: 'boolean',
                  initialValue: true
                }
              ]
            }
          ]
        }
      }]
    })
  ]
});
