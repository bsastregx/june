export interface PageDef {
  title: string;
  desc: string;
  tabs: string[];
  content: string[];
  hideHeader?: boolean;
  wide?: boolean;
  brandAware?: boolean;
  init?: () => void;
}

import { gettingStartedPage } from './getting-started.js';
import { tokensExportPage } from './tokens-export.js';
import { typographyPage } from './typography.js';
import { spacingPage } from './spacing.js';
import { colorsPage } from './colors.js';
import { shadowsPage } from './shadows.js';
import { breakpointsPage } from './breakpoints.js';
import { buttonPage } from './page-button.js';
import { eyebrowPage } from './page-eyebrow.js';
import { blocksPage } from './page-blocks.js';
import { lookAtMePage } from './page-look-at-me.js';
import { showAndTellPage } from './page-show-and-tell.js';
import { islandPage } from './page-island.js';
import { fieldPage } from './page-field.js';
import { smileyContactBoxPage } from './page-smiley-contact-box.js';
import { learnMorePage } from './page-learn-more.js';
import { cardRowPage } from './page-card-row.js';
import { illustrationsPage } from './page-illustrations.js';
import { deepDivePage } from './page-deep-dive.js';
export const pages: Record<string, PageDef> = {
  'getting-started': gettingStartedPage,
  'tokens-export': tokensExportPage,
  typography: typographyPage,
  spacing: spacingPage,
  colors: colorsPage,
  shadows: shadowsPage,
  breakpoints: breakpointsPage,
  blocks: blocksPage,
  button: buttonPage,
  eyebrow: eyebrowPage,
  'look-at-me': lookAtMePage,
  'show-and-tell': showAndTellPage,
  island: islandPage,
  field: fieldPage,
  'smiley-contact-box': smileyContactBoxPage,
  'learn-more': learnMorePage,
  'card-row': cardRowPage,
  illustrations: illustrationsPage,
  'deep-dive': deepDivePage,
};
