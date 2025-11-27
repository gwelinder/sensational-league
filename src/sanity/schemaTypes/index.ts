import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { styledText } from "./styledText";
import { homePage } from "./homePage";
import { playerDraftPage } from "./playerDraftPage";
import { page } from "./page";
import { policy } from "./policy";
import { pressRelease } from "./pressRelease";
import { emailTemplate } from "./emailTemplate";
import { siteSettings } from "./siteSettings";
import { contributorSettings } from "./contributorSettings";
import { logoImage } from "./objects/logoImage";
import { logo } from "./logo";
import { 
  heroSection, 
  signupSection, 
  contentSection, 
  partnersSection,
  advancedHeroSection,
  mediaSection,
  statsSection,
  flexibleSection,
  testimonialSection,
  faqSection,
  timelineSection,
  pricingSection,
  contactSection,
  teamSection
} from "./sections";
import { 
  callToActionBlock,
  statisticsBlock,
  socialProofBlock,
  newsletterSignupBlock
} from "./shared/reusableBlocks";
import { 
  season,
  team,
  player,
  match,
  venue,
  leagueStandings,
  notification,
  communication,
  event
} from "./league";
import {
  draftApplicant,
  newsletterSubscriber,
  cdpSegment,
  emailFlow,
  emailEvent
} from "./cdp";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
    // Documents
    siteSettings,
    homePage,
    playerDraftPage,
    page,
    policy,
    pressRelease,
    emailTemplate,
    contributorSettings,
    logo,
    
    // League Management
    season,
    team,
    player,
    match,
    venue,
    leagueStandings,
    notification,
    communication,
    event,
    
    // CDP (Customer Data Platform)
    draftApplicant,
    newsletterSubscriber,
    cdpSegment,
    emailFlow,
    emailEvent,
    
    // Objects
    blockContent,
    styledText,

    // Basic Sections
    heroSection,
    signupSection,
    contentSection,
    partnersSection,
    
    // Advanced Sections
    advancedHeroSection,
    mediaSection,
    statsSection,
    flexibleSection,
    testimonialSection,
    faqSection,
    timelineSection,
    pricingSection,
    contactSection,
    teamSection,
    
    // Reusable Blocks
    callToActionBlock,
    statisticsBlock,
    socialProofBlock,
    newsletterSignupBlock,
    
    // Object types
    logoImage,
  ],
};
