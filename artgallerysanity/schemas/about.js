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
      name: "aboutSection",
      title: "About Section",
      type: "array",
      of: [{ type: "aboutSection" }],
    },

    {
      name: "visitUsSection",
      title: "Visit Us Section",
      type: "array",
      of: [{ type: "visitUs" }],
    },

    {
      name: "connectSection",
      title: "Connect Section",
      type: "array",
      of: [{ type: "connect" }],
    },
    {
      name: "terminologySection",
      title: "Terminology Section",
      type: "array",
      of: [{ type: "terminology" }],
    },
    {
      name: "missionStatementSection",
      title: "Mission Statement Section",
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
