export default {
  name: "artist",
  title: "Artists",
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
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "name_cn",
      title: "Name Chinese",
      type: "string",
      fieldset: "translation",
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
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "description_cn",
      title: "Description Chinese",
      type: "blockContent",
      fieldset: "translation",
    },
    {
      name: "profile",
      title: "Profile",
      type: "image",
    },
    {
      name: "masterpiece",
      title: "Masterpiece",
      type: "image",
    },

    {
      name: "bio",
      title: "Bio ",
      type: "blockContent",
    },
    {
      name: "bio_cn",
      title: "Bio Chinese ",
      type: "blockContent",
      fieldset: "translation",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
