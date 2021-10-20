export default {
  name: "exhibitions",
  title: "Exhibitions",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
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
      name: "briefSection",
      title: "Brief Section",
      type: "object",
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
          name: "description",
          title: "Description",
          type: "blockContent",
        },
        {
          name: "description_cn",
          title: "Description Chinese",
          type: "blockContent",
        },
      ],
    },
    {
      name: "currentSection",
      title: "Current Section",
      type: "object",
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
          name: "exhibition",
          title: "Exhibition",
          type: "array",
          of: [{ type: "exhibition" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
