export default {
  name: "settings",
  title: "Settings",
  type: "document",
  fieldsets: [
    {
      name: "translation",
      title: "Translation",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
    },
    {
      name: "headerImage",
      title: "Header Image",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
    },
  ],
  fields: [
    {
      name: "orgnizationName",
      title: "Orgnization Name",
      type: "blockContent",
    },
    {
      name: "orgnizationName_cn",
      title: "Orgnization Name Chinese",
      type: "blockContent",
      fieldset: "translation",
    },
    {
      name: "site_name",
      title: "Website Name",
      type: "string",
    },
    {
      name: "site_name_cn",
      title: "Website Name Chinese",
      type: "string",
      fieldset: "translation",
    },
    {
      name: "abbreviation",
      title: "Abbreviation",
      type: "string",
    },

    {
      name: "phone",
      title: "Phone",
      type: "number",
    },

    {
      name: "email",
      title: "Email",
      type: "email",
    },
    {
      name: "social",
      title: "Social Media",
      type: "array",
      of: [{ type: "reference", to: { type: "socialMedia" } }],
    },
    {
      name: "exhibitions",
      title: "Exhibitions for desktop",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "exhibitions_mobile",
      title: "Exhibitions for mobile",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "artists",
      title: "Artists for desktop",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "artists_mobile",
      title: "Artists for mobile",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "landing",
      title: "Landing for desktop",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "landing_mobile",
      title: "Landing for mobile",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "news",
      title: "News for desktop",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "news_mobile",
      title: "News for mobile",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "about",
      title: "About for desktop",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "about_mobile",
      title: "About for mobile",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "hero_exhibition_link",
      title: "Exhibition Tab Link",
      description:
        "Exhibition Tab in the hero links to one certain exhibition page. Expected value is the target exhibition's slug.",
      type: "string",
    },
    {
      name: "link_font_size",
      title: "Links Font Size for Descktop",
      type: "number",
      description: "to determine the font size of the links in header",
    },
    {
      name: "mobile_link_font_size",
      title: "Links Font Size for Mobile",
      type: "number",
      description: "to determine the font size of the links in header",
    },
    {
      name: "cursor_font_size",
      title: "Curosr Font Size for Desktop",
      type: "number",
      description:
        "to determine the font size of the text besides curosr in header",
    },
  ],
};
