export default {
  name: "about",
  title: "About",
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
      name: "founder",
      title: "Founder",
      type: "array",
      of: [{ type: "founder" }],
    },
    {
      name: "aboutDescription",
      title: "About Description",
      type: "blockContent",
    },
    {
      name: "visitUs",
      title: "Visit Us",
      type: "array",
      of: [{ type: "visitUs" }],
    },

    {
      name: "connect",
      title: "Connect",
      type: "array",
      of: [{ type: "connect" }],
    },
    {
      name: "terminology",
      title: "Terminology",
      type: "array",
      of: [{ type: "terminology" }],
    },
    {
      name: "missionStatement",
      title: "Mission Statement",
      type: "array",
      of: [{ type: "missionStatement" }],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
