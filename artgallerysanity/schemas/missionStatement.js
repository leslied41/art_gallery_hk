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
      name: "content",
      title: "Content",
      type: "blockContent",
    },
  ],
};
