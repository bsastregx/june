export const librarySummary = [
  {
    access: "public",
    tagName: "june-block-card",
    className: "JuneBlockCard",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/blocks/june-block-card.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "cardTitle",
        attribute: "cardtitle",
        type: "any",
        default: "''"
      },
      {
        name: "body",
        attribute: "body",
        type: "any",
        default: "''"
      },
      {
        name: "linkText",
        attribute: "linktext",
        type: "any",
        default: "''"
      },
      {
        name: "linkHref",
        attribute: "linkhref",
        type: "any",
        default: "'#'"
      }
    ]
  },
  {
    access: "public",
    tagName: "june-blocks",
    className: "JuneBlocks",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/blocks/june-blocks.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "align",
        attribute: "align",
        type: " 'top' | 'left'",
        default: "'top'"
      },
      {
        name: "columns",
        attribute: "columns",
        type: " 2 | 3",
        default: "2"
      },
      {
        name: "showHeader",
        attribute: "showheader",
        type: "any",
        default: "true"
      },
      {
        name: "showFooter",
        attribute: "showfooter",
        type: "any",
        default: "false"
      },
      {
        name: "showButtons",
        attribute: "showbuttons",
        type: "any",
        default: "false"
      }
    ]
  },
  {
    access: "public",
    tagName: "june-button",
    className: "JuneButton",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/button/june-button.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "variant",
        attribute: "variant",
        type: " ButtonVariant",
        default: "'primary'",
        reflect: true
      },
      {
        name: "disabled",
        attribute: "disabled",
        type: "any",
        default: "false",
        reflect: true
      },
      {
        name: "label",
        attribute: "label",
        type: "any",
        default: "''"
      },
      {
        name: "iconOnly",
        attribute: "icon-only",
        type: "any",
        default: "false"
      },
      {
        name: "forceState",
        attribute: "force-state",
        type: " ForceState",
        default: "''",
        reflect: true
      }
    ]
  },
  {
    access: "public",
    tagName: "june-eyebrow",
    className: "JuneEyebrow",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/eyebrow/june-eyebrow.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "showIcon",
        attribute: "show-icon",
        type: "any",
        default: "true"
      },
      {
        name: "tagText",
        attribute: "tag-text",
        type: "any",
        default: "''"
      },
      {
        name: "bodyText",
        attribute: "body-text",
        type: "any",
        default: "''"
      },
      {
        name: "ctaText",
        attribute: "cta-text",
        type: "any",
        default: "''"
      },
      {
        name: "ctaHref",
        attribute: "cta-href",
        type: "any",
        default: "'#'"
      },
      {
        name: "showCta",
        attribute: "show-cta",
        type: "any",
        default: "true"
      }
    ]
  },
  {
    access: "public",
    tagName: "june-field",
    className: "JuneField",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/field/june-field.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "type",
        attribute: "type",
        type: " FieldType",
        default: "'text'",
        reflect: true
      },
      {
        name: "label",
        attribute: "label",
        type: "any",
        default: "''"
      },
      {
        name: "value",
        attribute: "value",
        type: "any",
        default: "''"
      },
      {
        name: "placeholder",
        attribute: "placeholder",
        type: "any",
        default: "''"
      },
      {
        name: "hint",
        attribute: "hint",
        type: "any",
        default: "''"
      },
      {
        name: "error",
        attribute: "error",
        type: "any",
        default: "''"
      },
      {
        name: "required",
        attribute: "required",
        type: "any",
        default: "false",
        reflect: true
      },
      {
        name: "disabled",
        attribute: "disabled",
        type: "any",
        default: "false",
        reflect: true
      },
      {
        name: "readonly",
        attribute: "readonly",
        type: "any",
        default: "false",
        reflect: true
      },
      {
        name: "name",
        attribute: "name",
        type: "any",
        default: "''"
      },
      {
        name: "options",
        attribute: "options",
        type: " FieldOption[]",
        default: "[]"
      },
      {
        name: "rows",
        attribute: "rows",
        type: "any",
        default: "4"
      },
      {
        name: "showRequiredText",
        attribute: "show-required-text",
        type: "any",
        default: "false"
      },
      {
        name: "forceState",
        attribute: "force-state",
        type: " ForceState",
        default: "''",
        reflect: true
      },
      {
        name: "placeholderSelect",
        attribute: "placeholder-select",
        type: "any",
        default: "'Select one'"
      },
      {
        name: "requiredText",
        attribute: "required-text",
        type: "any",
        default: "'(required)'"
      },
      {
        name: "errorText",
        attribute: "error-text",
        type: "any",
        default: "''"
      }
    ],
    methods: [
      {
        name: "focusInput",
        paramTypes: [],
        returnType: "void"
      }
    ]
  },
  {
    access: "public",
    tagName: "june-island",
    className: "JuneIsland",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/island/june-island.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "textPosition",
        attribute: "text-position",
        type: " TextPosition",
        default: "'left'",
        reflect: true
      }
    ]
  },
  {
    access: "public",
    tagName: "june-learn-more",
    className: "JuneLearnMore",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/learn-more/june-learn-more.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true
  },
  {
    access: "public",
    tagName: "june-look-at-me",
    className: "JuneLookAtMe",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/look-at-me/june-look-at-me.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "align",
        attribute: "align",
        type: " Align",
        default: "'center'",
        reflect: true
      },
      {
        name: "imagePosition",
        attribute: "image-position",
        type: " ImagePosition",
        default: "'none'",
        reflect: true
      },
      {
        name: "showEyebrow",
        attribute: "show-eyebrow",
        type: "any",
        default: "true"
      },
      {
        name: "showSecondary",
        attribute: "show-secondary",
        type: "any",
        default: "true"
      },
      {
        name: "showPlain",
        attribute: "show-plain",
        type: "any",
        default: "true"
      }
    ]
  },
  {
    access: "public",
    tagName: "june-show-and-tell",
    className: "JuneShowAndTell",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/show-and-tell/june-show-and-tell.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true,
    properties: [
      {
        name: "textPosition",
        attribute: "text-position",
        type: " TextPosition",
        default: "'left'",
        reflect: true
      },
      {
        name: "headerAlign",
        attribute: "header-align",
        type: " HeaderAlign",
        default: "'center'",
        reflect: true
      }
    ]
  },
  {
    access: "public",
    tagName: "june-smiley-contact-box",
    className: "JuneSmileyContactBox",
    description: "",
    fullClassJSDoc: "",
    srcPath: "./components/smiley-contact-box/june-smiley-contact-box.lit.ts",
    developmentStatus: "to-be-defined",
    mode: "open",
    shadow: true
  }
] as const satisfies LibraryComponents;

export type LibraryComponents = ComponentDefinition[];
export type ComponentDefinition = {
  /**
   * The visibility of the component in the library. "public" component can be
   * used outside of the library, but "private" components are scoped to the
   * library, meaning that they should not be used outside of the library.
   *
   * For example, if a component is part of a render and should only be controlled
   * by the render, it should be marked with "private" | "protected" | "package".
   */
  access: "public" | "private" | "protected" | "package";
  tagName: string;
  className: string;
  description: string;
  /**
   * The full JSDoc comment of the custom element Class.
   */
  fullClassJSDoc: string;
  /**
   * Relative path where the component's class is located.
   */
  srcPath: string;
  /**
   * The path where the component is defined to be imported.
   *
   * This path is defined "exports" field of the package.json.
   */
  packageJsonExportsPath?: string;
  /**
   * Semantic role that the component implements. A component might implement
   * multiple accessible roles, in which case they are defined with an array.
   */
  accessibleRole?: string | string[];
  /**
   * Development status of the component.
   */
  developmentStatus:
    | "experimental"
    | "developer-preview"
    | "stable"
    | "to-be-defined";
  /**
   * `true` if the component can be used in web forms by setting the name
   * attribute on the tag.
   */
  formAssociated?: boolean;
  /**
   * Shadow root mode.
   */
  mode: "open" | "closed";
  /**
   * `true` if the web component has Shadow DOM.
   */
  shadow: boolean;
  properties?: ComponentDefinitionProperties;
  events?: ComponentDefinitionEvents;
  methods?: ComponentDefinitionMethods;
  parts?: ComponentDefinitionParts;
  slots?: ComponentDefinitionSlots;
  cssVariables?: ComponentDefinitionCssVariables;
  /**
   * The location of type declarations that the component imports in order to
   * correctly type its properties. These imports are relative to the folder
   * of where the library is analyzed.
   */
  propertyImportTypes?: ComponentImportTypes;
  /**
   * The location of type declarations that the component imports in order to
   * correctly type its events. These imports are relative to the folder
   * of where the library is analyzed.
   */
  eventImportTypes?: ComponentImportTypes;
  /**
   * The location of type declarations that the component imports in order to
   * correctly type its methods. These imports are relative to the folder
   * of where the library is analyzed.
   */
  methodImportTypes?: ComponentImportTypes;
};
export type ComponentDefinitionProperties = ComponentDefinitionProperty[];
export type ComponentDefinitionEvents = ComponentDefinitionEvent[];
export type ComponentDefinitionMethods = ComponentDefinitionMethod[];
export type ComponentDefinitionParts = ComponentDefinitionPart[];
export type ComponentDefinitionSlots = ComponentDefinitionSlot[];
export type ComponentDefinitionCssVariables = ComponentDefinitionCssVariable[];
export type ComponentImportTypes = Record<string, string[]>;
export type ComponentDefinitionProperty = {
  /**
   * If `false`, the property is not associated with an HTML attribute.
   * Otherwise, it is a string with the name of the attribute that is synced
   * with the class property.
   */
  attribute: string | false;
  default: string;
  description?: string;
  name: string;
  /**
   * `true` if the property value is reflected with the attribute in the DOM.
   */
  reflect?: boolean;
  /**
   * `true` if the property is required for using the component.
   */
  required?: boolean;
  type: string;
};
export type ComponentDefinitionEvent = {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  description?: string;
  /**
   * Type for the `detail` field of the event. If the event doesn't emits any
   * detail, the `detailType` is be `void`.
   */
  detailType: string;
  name: string;
};
export type ComponentDefinitionMethod = {
  description?: string;
  name: string;
  paramTypes: {
    name: string;
    description?: string;
    type: string;
  }[];
  returnType: string;
};
export type ComponentDefinitionPart = {
  description?: string;
  name: string;
};
export type ComponentDefinitionSlot = {
  description?: string;
  name: string;
};
export type ComponentDefinitionCssVariable = {
  description?: string;
  default?: string;
  name: string;
};
