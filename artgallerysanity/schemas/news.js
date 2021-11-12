export default {
  name: "news",
  title: "News",
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
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    { name: "news_brief", title: "News Brief", type: "blockContent" },
    {
      name: "news_brief_cn",
      title: "News Brief Chinese",
      type: "blockContent",
      fieldset: "translation",
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
      fieldset: "translation",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
