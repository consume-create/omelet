import { defineField, defineType } from 'sanity';
import { HashIcon, WarningOutlineIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'tags',
  title: 'Tags',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'tag',
      id: '_id'
    },
    prepare({ title, id }) {
      return {
        title: title ? title : 'Untitled',
        media: id.substring(0,5) != 'draft' ? HashIcon : WarningOutlineIcon
      };
    }
  }
});
