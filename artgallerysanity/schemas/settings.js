export default {
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      name: "orgnizationName",
      title: "Orgnization Name",
      type: "blockContent",
    },
    {
      name: "orgnizationName_cn",
      title: "Orgnization Name Chinese",
      type: "blockContent",
    },
    {
      name: "abbreviation",
      title: "Abbreviation",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "text",
    },
    {
      name: "phone",
      title: "Phone",
      type: "number",
    },
    {
      name: "businessHours",
      title: "Business Hours",
      type: "text",
    },
    {
      name: "email",
      title: "Email",
      type: "email",
    },
    {
      name: "socialMedia",
      title: "Socail Media",
      type: "array",
      of: [{ type: "socialMedia" }],
    },
  ],
};
