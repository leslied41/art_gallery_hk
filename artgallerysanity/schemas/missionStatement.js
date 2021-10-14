export default {
  name: "missionStatement",
  title: "Mission Statement",
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
      name: "content",
      title: "Content",
      type: "blockContent",
    },
    {
      name: "content_cn",
      title: "Content Chinese",
      type: "blockContent",
    },
  ],
};
