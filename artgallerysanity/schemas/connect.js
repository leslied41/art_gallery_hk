export default {
  name: "connect",
  title: "Connect",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "phone",
      title: "Phone",
      type: "number",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "socialMedia",
      title: "Socail Media",
      type: "array",
      of: [{ type: "socialMedia" }],
    },
  ],
};
