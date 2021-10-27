export default {
  name: "work",
  title: "Work",
  type: "document",
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
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
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
    },
    {
      name: "info",
      title: "Info ",
      type: "blockContent",
    },
    {
      name: "info_cn",
      title: "Info Chinese ",
      type: "blockContent",
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
      options: {
        metadata: [
          "dimensions", // Always included
          "hasAlpha", // Always included
          "isOpaque", // Always included
        ],
      },
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
