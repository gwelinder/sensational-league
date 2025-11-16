import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(
          S.editor()
            .id('homePage')
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Player Draft Page')
        .child(
          S.editor()
            .id('playerDraftPage')
            .schemaType('playerDraftPage')
            .documentId('playerDraftPage')
        ),
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !['siteSettings', 'homePage', 'playerDraftPage'].includes(item.getId() ?? '')),
    ])
