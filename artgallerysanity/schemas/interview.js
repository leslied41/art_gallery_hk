export default {
  name: "interviews",
  title: "Interviews",
  type: "document",
  fieldsets: [
    {
      name: "translation",
      title: "Translation",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "title_cn",
      title: "Title Chinses",
      type: "string",
      fieldset: "translation",
    },
    { name: "interview_link", title: "Interview Link", type: "url" },
    {
      name: "publication_time",
      title: "Publication Time",
      type: "datetime",
    },
    {
      title: "Interviewee",
      name: "interviewee",
      type: "reference",
      to: [{ type: "artist" }],
    },
    { name: "interview_brief", title: "Interview Brief", type: "blockContent" },
    {
      name: "interview_brief_cn",
      title: "Interview Brief Chinese",
      type: "blockContent",
      fieldset: "translation",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
