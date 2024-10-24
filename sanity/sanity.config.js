import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

import { colorInput } from '@sanity/color-input';
import { media } from 'sanity-plugin-media';

import { EyeOpenIcon } from '@sanity/icons';
import { Iframe } from 'sanity-plugin-iframe-pane';

// Singletons...
const singletonTypes = new Set(schemaTypes.reduce((filtered, schemaType) => {
  if (schemaType.singleton) {
    filtered.push(schemaType.name);
  }
  return filtered;
}, []));

const singletonListItem = (S, typeName, title) => {
  return S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).views([S.view.form(), S.view.component(Iframe).options({
        url: (doc) => resolvePageUrl(doc),
        showDisplayUrl: false,
        defaultSize: 'desktop',
        reload: { button: true }
      })
      .icon(EyeOpenIcon)
      .title('Preview')])
    );
};

// Iframe previews...
function resolvePageUrl(doc) {
  let baseUrl = 'https://omelet-website.sanity.studio',
      slug = doc?.slug?.current ? doc.slug.current : '';

  if (window.location.hostname === 'localhost') {
    baseUrl = 'http://localhost:3000'
  }

  return slug ? `${baseUrl}/${slug}?preview=true` : `${baseUrl}?preview=true`;
}

function resolveCaseStudyUrl(doc) {
  let baseUrl = 'https://omelet-website.sanity.studio',
      slug = doc?.slug?.current ? doc.slug.current : '';

  if (window.location.hostname === 'localhost') {
    baseUrl = 'http://localhost:3000'
  }

  return slug ? `${baseUrl}/${doc.slug.current}?preview=true` : `${baseUrl}?preview=true`;
}

const defaultDocumentNode = (S, { schemaType }) => {
  return S.document().views([S.view.form(), S.view.component(Iframe).options({
    url: (doc) => schemaType === 'caseStudy' ? resolveCaseStudyUrl(doc) : resolvePageUrl(doc),
    showDisplayUrl: false,
    defaultSize: 'desktop',
    reload: { button: true }
  })
  .icon(EyeOpenIcon)
  .title('Preview')]);
};

export default defineConfig({
  name: 'default',
  title: 'Omelet',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  document: {
    newDocumentOptions: (prev, { currentUser, creationContext }) => {
      if (creationContext.type === 'global') {
        return [];
      // } else if (creationContext.type === 'document' && creationContext.schemaType === 'caseStudies') {
      } else if (creationContext.type === 'document') {
        return [];
      }
      return prev;
    }
  },
  plugins: [
    structureTool({
      defaultDocumentNode,
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...Array.from(singletonTypes).map((singletonType) => {
              const schemaType = schemaTypes.find(schemaType => schemaType.name === singletonType);
              if (schemaType) {
                return singletonListItem(S, schemaType.name, schemaType.title).icon(schemaType.icon)
              }
            }),
            S.divider(),
            ...S.documentTypeListItems()
              .filter(
                listItem => ![
                  ...singletonTypes,
                  'media.tag',
                ].includes(listItem.getId())
              )
          ])
    }),
    colorInput(),
    media()
  ],
  schema: {
    types: schemaTypes,
    // Filter out types from the global “New document” menu options
    templates: (templates) => {
      return templates.filter(({ schemaType }) => ![...singletonTypes].includes(schemaType))
    }
  }
})