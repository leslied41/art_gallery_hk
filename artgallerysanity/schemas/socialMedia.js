export default {
  name: "socialMedia",
  title: "Social Media",
  type: "document",
  fields: [
    {
      name: "platform",
      title: "Platform",
      type: "string",
    },
    {
      name: "url",
      title: "Url",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "platform",
    },
  },
};
