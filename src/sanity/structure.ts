import type {StructureResolver} from 'sanity/structure'
import { CDPDashboard } from './components/CDPDashboard'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // === MAIN PAGES ===
      S.listItem()
        .title('Home Page')
        .icon(() => '🏠')
        .child(
          S.editor()
            .id('homePage')
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Player Draft Page')
        .icon(() => '⚽')
        .child(
          S.editor()
            .id('playerDraftPage')
            .schemaType('playerDraftPage')
            .documentId('playerDraftPage')
        ),
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      S.divider(),
      
      // === CDP (Customer Data Platform) ===
      S.listItem()
        .title('CDP')
        .icon(() => '📊')
        .child(
          S.list()
            .title('Customer Data Platform')
            .items([
              S.listItem()
                .title('Dashboard')
                .icon(() => '📈')
                .child(
                  S.component(CDPDashboard)
                    .title('CDP Dashboard')
                    .id('cdp-dashboard')
                ),
              S.divider(),
              S.listItem()
                .title('Draft Applicants')
                .icon(() => '👥')
                .child(
                  S.documentTypeList('draftApplicant')
                    .title('Draft Applicants')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Newsletter Subscribers')
                .icon(() => '📬')
                .child(
                  S.documentTypeList('newsletterSubscriber')
                    .title('Newsletter Subscribers')
                    .defaultOrdering([{ field: 'subscribedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Segments')
                .icon(() => '🎯')
                .child(
                  S.documentTypeList('cdpSegment')
                    .title('Segments')
                ),
              S.listItem()
                .title('Email Flows')
                .icon(() => '📧')
                .child(
                  S.documentTypeList('emailFlow')
                    .title('Email Flows')
                ),
              S.listItem()
                .title('Email Templates')
                .icon(() => '📝')
                .child(
                  S.documentTypeList('emailTemplate')
                    .title('Email Templates')
                ),
              S.divider(),
              S.listItem()
                .title('Email Events')
                .icon(() => '📬')
                .child(
                  S.documentTypeList('emailEvent')
                    .title('Email Events')
                    .defaultOrdering([{ field: 'occurredAt', direction: 'desc' }])
                ),
            ])
        ),
      
      // === LEAGUE MANAGEMENT ===
      S.listItem()
        .title('League')
        .icon(() => '🏆')
        .child(
          S.list()
            .title('League Management')
            .items([
              S.listItem()
                .title('Seasons')
                .child(S.documentTypeList('season').title('Seasons')),
              S.listItem()
                .title('Teams')
                .child(S.documentTypeList('team').title('Teams')),
              S.listItem()
                .title('Players')
                .child(S.documentTypeList('player').title('Players')),
              S.listItem()
                .title('Matches')
                .child(S.documentTypeList('match').title('Matches')),
              S.listItem()
                .title('Venues')
                .child(S.documentTypeList('venue').title('Venues')),
              S.listItem()
                .title('Standings')
                .child(S.documentTypeList('leagueStandings').title('Standings')),
              S.divider(),
              S.listItem()
                .title('Communications')
                .child(S.documentTypeList('communication').title('Communications')),
              S.listItem()
                .title('Notifications')
                .child(S.documentTypeList('notification').title('Notifications')),
              S.listItem()
                .title('Events')
                .child(S.documentTypeList('event').title('Events')),
            ])
        ),
      
      S.divider(),
      
      // === CONTENT ===
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Press Releases')
        .icon(() => '📰')
        .child(S.documentTypeList('pressRelease').title('Press Releases')),
      S.listItem()
        .title('Policies')
        .icon(() => '📋')
        .child(S.documentTypeList('policy').title('Policies')),
      S.listItem()
        .title('Logos')
        .icon(() => '🖼️')
        .child(S.documentTypeList('logo').title('Logos')),
    ])
