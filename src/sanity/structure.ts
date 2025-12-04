import type {StructureResolver} from 'sanity/structure'
import { CDPDashboard } from './components/CDPDashboard'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
//
// STRUCTURE GUIDE FOR NON-TECHNICAL EDITORS:
// ==========================================
//
// WEBSITE CONTENT - Edit what visitors see on the website
//   • Captains - Add/edit captain profiles (photos, bios, videos)
//   • Home Page - Hero section, about section, CTAs
//   • Player Draft Page - Draft application page content
//   • Other Pages - Additional website pages
//   • Press Releases - News and announcements
//   • Legal - Privacy policy, terms, etc.
//
// SITE SETTINGS - Global configuration
//   • Site Settings - Logo, navigation, footer
//   • Logos - Brand assets
//
// ADMIN TOOLS (Technical) - Data management
//   • CDP - Customer data, email flows, segments
//   • League - Teams, matches, standings (when live)
//
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sensational League')
    .items([
      // ═══════════════════════════════════════════════════════════
      // WEBSITE CONTENT - What visitors see on the site
      // ═══════════════════════════════════════════════════════════
      S.listItem()
        .title('Website Content')
        .icon(() => '🌐')
        .child(
          S.list()
            .title('Website Content')
            .items([
              // --- CAPTAINS (Most frequently edited) ---
              S.listItem()
                .title('Captains')
                .icon(() => '👑')
                .child(
                  S.list()
                    .title('Captains')
                    .items([
                      S.listItem()
                        .title('Captains Page')
                        .icon(() => '📄')
                        .child(
                          S.editor()
                            .id('captainsPage')
                            .schemaType('captainsPage')
                            .documentId('captainsPage')
                            .title('Edit Captains Overview Page')
                        ),
                      S.divider(),
                      S.listItem()
                        .title('Captain Profiles')
                        .icon(() => '👤')
                        .child(
                          S.documentTypeList('captain')
                            .title('Captain Profiles')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                    ])
                ),

              S.divider(),

              // --- MAIN PAGES ---
              S.listItem()
                .title('Home Page')
                .icon(() => '🏠')
                .child(
                  S.editor()
                    .id('homePage')
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Edit Home Page')
                ),
              S.listItem()
                .title('Player Draft Page')
                .icon(() => '⚽')
                .child(
                  S.editor()
                    .id('playerDraftPage')
                    .schemaType('playerDraftPage')
                    .documentId('playerDraftPage')
                    .title('Edit Player Draft Page')
                ),
              S.listItem()
                .title('Other Pages')
                .icon(() => '📄')
                .child(S.documentTypeList('page').title('Website Pages')),

              S.divider(),

              // --- NEWS & CONTENT ---
              S.listItem()
                .title('Press Releases')
                .icon(() => '📰')
                .child(S.documentTypeList('pressRelease').title('Press Releases')),
              S.listItem()
                .title('Legal & Policies')
                .icon(() => '📋')
                .child(S.documentTypeList('policy').title('Legal Documents')),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════════
      // SITE SETTINGS - Global configuration
      // ═══════════════════════════════════════════════════════════
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('General Settings')
                .icon(() => '⚙️')
                .child(
                  S.editor()
                    .id('siteSettings')
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Site Settings')
                ),
              S.listItem()
                .title('Design & Styling')
                .icon(() => '🎨')
                .child(
                  S.editor()
                    .id('designSettings')
                    .schemaType('designSettings')
                    .documentId('designSettings')
                    .title('Design Settings')
                ),
              S.listItem()
                .title('Logos & Branding')
                .icon(() => '🖼️')
                .child(S.documentTypeList('logo').title('Logos')),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════════
      // ADMIN TOOLS - Technical/Data management
      // ═══════════════════════════════════════════════════════════
      S.listItem()
        .title('Admin Tools')
        .icon(() => '🔧')
        .child(
          S.list()
            .title('Admin Tools')
            .items([
              // --- CDP ---
              S.listItem()
                .title('CDP (Customer Data)')
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
                        .child(S.documentTypeList('cdpSegment').title('Segments')),
                      S.listItem()
                        .title('Email Flows')
                        .icon(() => '📧')
                        .child(S.documentTypeList('emailFlow').title('Email Flows')),
                      S.listItem()
                        .title('Email Templates')
                        .icon(() => '📝')
                        .child(S.documentTypeList('emailTemplate').title('Email Templates')),
                      S.divider(),
                      S.listItem()
                        .title('Email Events (Log)')
                        .icon(() => '📬')
                        .child(
                          S.documentTypeList('emailEvent')
                            .title('Email Events')
                            .defaultOrdering([{ field: 'occurredAt', direction: 'desc' }])
                        ),
                    ])
                ),

              // --- LEAGUE MANAGEMENT ---
              S.listItem()
                .title('League Management')
                .icon(() => '🏆')
                .child(
                  S.list()
                    .title('League Management')
                    .items([
                      S.listItem()
                        .title('Seasons')
                        .icon(() => '📅')
                        .child(S.documentTypeList('season').title('Seasons')),
                      S.listItem()
                        .title('Teams')
                        .icon(() => '👥')
                        .child(S.documentTypeList('team').title('Teams')),
                      S.listItem()
                        .title('Players')
                        .icon(() => '⚽')
                        .child(S.documentTypeList('player').title('Players')),
                      S.listItem()
                        .title('Matches')
                        .icon(() => '🏟️')
                        .child(S.documentTypeList('match').title('Matches')),
                      S.listItem()
                        .title('Venues')
                        .icon(() => '📍')
                        .child(S.documentTypeList('venue').title('Venues')),
                      S.listItem()
                        .title('Standings')
                        .icon(() => '🏅')
                        .child(S.documentTypeList('leagueStandings').title('Standings')),
                      S.divider(),
                      S.listItem()
                        .title('Communications')
                        .icon(() => '📢')
                        .child(S.documentTypeList('communication').title('Communications')),
                      S.listItem()
                        .title('Notifications')
                        .icon(() => '🔔')
                        .child(S.documentTypeList('notification').title('Notifications')),
                      S.listItem()
                        .title('Events')
                        .icon(() => '📆')
                        .child(S.documentTypeList('event').title('Events')),
                    ])
                ),
            ])
        ),
    ])
