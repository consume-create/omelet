import { defineField, defineType } from 'sanity';

export default defineType({
  options: { columns: 2 },
  name: 'servicesCTA',
  title: 'Services CTA',
  type: 'object',
  validation: [
    Rule => Rule.required()
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      name: 'url',
      title: 'Link URL',
      type: 'url',
      validation: [
        Rule => Rule.required()
      ]
    })
  ]
});
