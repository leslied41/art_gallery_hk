export default {
  name: "exhibition",
  title: "Exhibition",
  type: "document",
  fields: [
    {
      name: "exhibition_status",
      title: "Exhibitions Status",
      type: "string",
      options: {
        list: [
          { title: "current", value: "Current" },
          { title: "future", value: "Future" },
        ],
      },
    },
    {
      name: "name_exo",
      title: "Name Exo",
      type: "string",
    },
    {
      name: "name_exo_cn",
      title: "Name Exo Chinese",
      type: "string",
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
      name: "date",
      title: "Date",
      type: "string",
    },
    {
      name: "date_cn",
      title: "Date Chinese",
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
      name: "introduction",
      title: "Introduction",
      type: "blockContent",
    },
    {
      name: "introduction_cn",
      title: "Introduction Chinese",
      type: "blockContent",
    },
    {
      name: "works",
      title: "Works",
      type: "array",
      of: [{ type: "reference", to: { type: "work" } }],
    },
  ],
  preview: {
    select: {
      title: "name_exo",
    },
  },
};
