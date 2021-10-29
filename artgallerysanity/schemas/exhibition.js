export default {
  name: "exhibition",
  title: "Exhibitions",
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
  ],
  fields: [
    {
      name: "name_exo",
      title: "Name",
      type: "string",
    },
    {
      name: "name_exo_cn",
      title: "Name Chinese",
      type: "string",
      fieldset: "translation",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name_exo",
        maxLength: 96,
      },
    },
    {
      name: "exhibition_status",
      title: "Exhibitions Status",
      type: "string",
      options: {
        list: [
          { title: "current", value: "Current" },
          { title: "future", value: "Future" },
          { title: "past", value: "Past" },
        ],
      },
    },

    {
      name: "introduction",
      title: "Introduction",
      type: "blockContent",
    },
    {
      name: "date",
      title: "Date",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "image_parameter",
      title: "Image Parameter",
      type: "blockContent",
    },
    {
      name: "works",
      title: "Works",
      type: "array",
      of: [{ type: "reference", to: { type: "work" } }],
    },

    {
      name: "date_cn",
      title: "Date Chinese",
      type: "string",
      fieldset: "translation",
    },

    {
      name: "introduction_cn",
      title: "Introduction Chinese",
      type: "blockContent",
      fieldset: "translation",
    },
  ],
  preview: {
    select: {
      title: "name_exo",
    },
  },
};
