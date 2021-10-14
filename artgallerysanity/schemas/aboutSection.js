export default {
  name: "aboutSection",
  title: "About Section",
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
};
