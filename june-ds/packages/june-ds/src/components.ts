// Types used by properties, events and methods




// Component class types
import type { JuneBlockCard as JuneBlockCardElement } from "./components/blocks/june-block-card.lit.ts";
import type { JuneBlocks as JuneBlocksElement } from "./components/blocks/june-blocks.lit.ts";
import type { JuneButton as JuneButtonElement } from "./components/button/june-button.lit.ts";
import type { JuneEyebrow as JuneEyebrowElement } from "./components/eyebrow/june-eyebrow.lit.ts";
import type { JuneField as JuneFieldElement } from "./components/field/june-field.lit.ts";
import type { JuneIsland as JuneIslandElement } from "./components/island/june-island.lit.ts";
import type { JuneLearnMore as JuneLearnMoreElement } from "./components/learn-more/june-learn-more.lit.ts";
import type { JuneLookAtMe as JuneLookAtMeElement } from "./components/look-at-me/june-look-at-me.lit.ts";
import type { JuneShowAndTell as JuneShowAndTellElement } from "./components/show-and-tell/june-show-and-tell.lit.ts";
import type { JuneSmileyContactBox as JuneSmileyContactBoxElement } from "./components/smiley-contact-box/june-smiley-contact-box.lit.ts";

/**
 * Each interface contains the base class of the custom elements of the
 * library.
 */
export interface ComponentBaseClasses {
  "june-block-card": JuneBlockCardElement;
  "june-blocks": JuneBlocksElement;
  "june-button": JuneButtonElement;
  "june-eyebrow": JuneEyebrowElement;
  "june-field": JuneFieldElement;
  "june-island": JuneIslandElement;
  "june-learn-more": JuneLearnMoreElement;
  "june-look-at-me": JuneLookAtMeElement;
  "june-show-and-tell": JuneShowAndTellElement;
  "june-smiley-contact-box": JuneSmileyContactBoxElement;
}

/**
 * Each interface contains the properties of the custom elements of the library.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ComponentProperties {
  export type JuneBlockCard = Pick<JuneBlockCardElement, "cardTitle" | "body" | "linkText" | "linkHref">;
  export type JuneBlocks = Pick<JuneBlocksElement, "align" | "columns" | "showHeader" | "showFooter" | "showButtons">;
  export type JuneButton = Pick<JuneButtonElement, "variant" | "disabled" | "label" | "iconOnly" | "forceState">;
  export type JuneEyebrow = Pick<JuneEyebrowElement, "showIcon" | "tagText" | "bodyText" | "ctaText" | "ctaHref" | "showCta">;
  export type JuneField = Pick<JuneFieldElement, "type" | "label" | "value" | "placeholder" | "hint" | "error" | "required" | "disabled" | "readonly" | "name" | "options" | "rows" | "showRequiredText" | "forceState" | "placeholderSelect" | "requiredText" | "errorText">;
  export type JuneIsland = Pick<JuneIslandElement, "textPosition">;
  export type JuneLearnMore = {};
  export type JuneLookAtMe = Pick<JuneLookAtMeElement, "align" | "imagePosition" | "showEyebrow" | "showSecondary" | "showPlain">;
  export type JuneShowAndTell = Pick<JuneShowAndTellElement, "textPosition" | "headerAlign">;
  export type JuneSmileyContactBox = {};
}

/**
 * Each interface contains the properties of the custom elements of the library.
 * This format is used for SolidJS applications.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ComponentPropertiesSolidJS {
  export type JuneBlockCard = {
    /**
     * 
     */
    "prop:cardTitle"?: any;

    /**
     * 
     */
    "prop:body"?: any;

    /**
     * 
     */
    "prop:linkText"?: any;

    /**
     * 
     */
    "prop:linkHref"?: any;
  };

  export type JuneBlocks = {
    /**
     * 
     */
    "prop:align"?:  'top' | 'left';

    /**
     * 
     */
    "prop:columns"?:  2 | 3;

    /**
     * 
     */
    "prop:showHeader"?: any;

    /**
     * 
     */
    "prop:showFooter"?: any;

    /**
     * 
     */
    "prop:showButtons"?: any;
  };

  export type JuneButton = {
    /**
     * 
     */
    "prop:variant"?:  ButtonVariant;

    /**
     * 
     */
    "prop:disabled"?: any;

    /**
     * 
     */
    "prop:label"?: any;

    /**
     * 
     */
    "prop:iconOnly"?: any;

    /**
     * 
     */
    "prop:forceState"?:  ForceState;
  };

  export type JuneEyebrow = {
    /**
     * 
     */
    "prop:showIcon"?: any;

    /**
     * 
     */
    "prop:tagText"?: any;

    /**
     * 
     */
    "prop:bodyText"?: any;

    /**
     * 
     */
    "prop:ctaText"?: any;

    /**
     * 
     */
    "prop:ctaHref"?: any;

    /**
     * 
     */
    "prop:showCta"?: any;
  };

  export type JuneField = {
    /**
     * 
     */
    "prop:type"?:  FieldType;

    /**
     * 
     */
    "prop:label"?: any;

    /**
     * 
     */
    "prop:value"?: any;

    /**
     * 
     */
    "prop:placeholder"?: any;

    /**
     * 
     */
    "prop:hint"?: any;

    /**
     * 
     */
    "prop:error"?: any;

    /**
     * 
     */
    "prop:required"?: any;

    /**
     * 
     */
    "prop:disabled"?: any;

    /**
     * 
     */
    "prop:readonly"?: any;

    /**
     * 
     */
    "prop:name"?: any;

    /**
     * 
     */
    "prop:options"?:  FieldOption[];

    /**
     * 
     */
    "prop:rows"?: any;

    /**
     * 
     */
    "prop:showRequiredText"?: any;

    /**
     * 
     */
    "prop:forceState"?:  ForceState;

    /**
     * 
     */
    "prop:placeholderSelect"?: any;

    /**
     * 
     */
    "prop:requiredText"?: any;

    /**
     * 
     */
    "prop:errorText"?: any;
  };

  export type JuneIsland = {
    /**
     * 
     */
    "prop:textPosition"?:  TextPosition;
  };

  export type JuneLearnMore = {};

  export type JuneLookAtMe = {
    /**
     * 
     */
    "prop:align"?:  Align;

    /**
     * 
     */
    "prop:imagePosition"?:  ImagePosition;

    /**
     * 
     */
    "prop:showEyebrow"?: any;

    /**
     * 
     */
    "prop:showSecondary"?: any;

    /**
     * 
     */
    "prop:showPlain"?: any;
  };

  export type JuneShowAndTell = {
    /**
     * 
     */
    "prop:textPosition"?:  TextPosition;

    /**
     * 
     */
    "prop:headerAlign"?:  HeaderAlign;
  };

  export type JuneSmileyContactBox = {};
}

/**
 * Each interface contains the events of the custom elements of the library.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ComponentEvents {
  
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                  Types for JSX templates
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace LocalJSX {
  export type JuneBlockCard = ComponentProperties.JuneBlockCard;

  export type JuneBlocks = ComponentProperties.JuneBlocks;

  export type JuneButton = ComponentProperties.JuneButton;

  export type JuneEyebrow = ComponentProperties.JuneEyebrow;

  export type JuneField = ComponentProperties.JuneField;

  export type JuneIsland = ComponentProperties.JuneIsland;

  export type JuneLearnMore = ComponentProperties.JuneLearnMore;

  export type JuneLookAtMe = ComponentProperties.JuneLookAtMe;

  export type JuneShowAndTell = ComponentProperties.JuneShowAndTell;

  export type JuneSmileyContactBox = ComponentProperties.JuneSmileyContactBox;
  
  interface IntrinsicElements {
    
    "june-block-card": JuneBlockCard;
    
    
    "june-blocks": JuneBlocks;
    
    
    "june-button": JuneButton;
    
    
    "june-eyebrow": JuneEyebrow;
    
    
    "june-field": JuneField;
    
    
    "june-island": JuneIsland;
    
    
    "june-learn-more": JuneLearnMore;
    
    
    "june-look-at-me": JuneLookAtMe;
    
    
    "june-show-and-tell": JuneShowAndTell;
    
    
    "june-smiley-contact-box": JuneSmileyContactBox;
  }
}
  
export type { LocalJSX as JSX };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                Types for SolidJS templates
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace SolidJsJSX {
  export type JuneBlockCard = ComponentPropertiesSolidJS.JuneBlockCard;

  export type JuneBlocks = ComponentPropertiesSolidJS.JuneBlocks;

  export type JuneButton = ComponentPropertiesSolidJS.JuneButton;

  export type JuneEyebrow = ComponentPropertiesSolidJS.JuneEyebrow;

  export type JuneField = ComponentPropertiesSolidJS.JuneField;

  export type JuneIsland = ComponentPropertiesSolidJS.JuneIsland;

  export type JuneLearnMore = ComponentPropertiesSolidJS.JuneLearnMore;

  export type JuneLookAtMe = ComponentPropertiesSolidJS.JuneLookAtMe;

  export type JuneShowAndTell = ComponentPropertiesSolidJS.JuneShowAndTell;

  export type JuneSmileyContactBox = ComponentPropertiesSolidJS.JuneSmileyContactBox;
  
  interface IntrinsicElements {
    
    "june-block-card": JuneBlockCard;
    
    
    "june-blocks": JuneBlocks;
    
    
    "june-button": JuneButton;
    
    
    "june-eyebrow": JuneEyebrow;
    
    
    "june-field": JuneField;
    
    
    "june-island": JuneIsland;
    
    
    "june-learn-more": JuneLearnMore;
    
    
    "june-look-at-me": JuneLookAtMe;
    
    
    "june-show-and-tell": JuneShowAndTell;
    
    
    "june-smiley-contact-box": JuneSmileyContactBox;
  }
}

export type { SolidJsJSX };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//          Apply module types for React templates
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// @ts-expect-error This module exists in React applications
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//         Apply module types for SolidJS templates
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// @ts-expect-error This module exists in SolidJS applications
declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends SolidJsJSX.IntrinsicElements {}
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//        Apply module types for StencilJS templates
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// @ts-expect-error This module exists in StencilJS applications
declare module "@stencil/core" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}