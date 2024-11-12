import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: TextIcon,
  description: 'Enter a Headline to automatically split this text block into 2 columns. Otherwise, just fill out the copy field and this will be centered.',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'text',
      rows: 4,
      validation: [
        Rule => Rule.required()
      ]
    })
  ]
});
