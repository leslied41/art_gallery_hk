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
      name: "abbreviation",
      title: "Abbreviation",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "text",
    },
    {
      name: "address_cn",
      title: "Address Chinese",
      type: "text",
      fieldset: "translation",
    },
    {
      name: "phone",
      title: "Phone",
      type: "number",
    },
    {
      name: "businessHours",
      title: "Business Hours",
      type: "text",
    },
    {
      name: "businessHours_cn",
      title: "Business Hours Chinese",
      type: "text",
      fieldset: "translation",
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
      title: "Exhibitions",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "artists",
      title: "Artists",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "landing",
      title: "Landing",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "news",
      title: "News",
      type: "image",
      fieldset: "headerImage",
    },
    {
      name: "about",
      title: "About",
      type: "image",
      fieldset: "headerImage",
    },
  ],
};
