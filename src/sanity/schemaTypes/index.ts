import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { homePage } from "./homePage";
import { page } from "./page";
import { policy } from "./policy";
import { siteSettings } from "./siteSettings";
import { contributorSettings } from "./contributorSettings";
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

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
    // Documents
    siteSettings, 
    homePage,
    page,
    policy,
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
    
    // Objects
    blockContent,
    
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
  ],
};
