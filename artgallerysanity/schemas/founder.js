export default {
  name: "founder",
  title: "Founder",
  type: "image",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      type: "blockContent",
    },
    {
      name: "socialMedia",
      title: "Socail Media",
      type: "array",
      of: [{ type: "socialMedia" }],
    },
  ],
};
