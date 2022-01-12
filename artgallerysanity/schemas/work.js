export default {
  name: "work",
  title: "Works",
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
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "name_cn",
      title: "Name Chinese",
      type: "string",
      fieldset: "translation",
    },

    {
      name: "introduction",
      title: "Introduction ",
      type: "blockContent",
    },
    {
      name: "introduction_cn",
      title: "Introduction Chinese ",
      type: "blockContent",
      fieldset: "translation",
    },
    {
      name: "author",
      title: "Author",
      type: "array",
      of: [{ type: "reference", to: { type: "artist" } }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      // options: {
      //   metadata: [
      //     "dimensions", // Always included
      //     "hasAlpha", // Always included
      //     "isOpaque", // Always included
      //   ],
      // },
    },
    {
      name: "image_parameter",
      title: "Image parameter ",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
