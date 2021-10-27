export default {
  name: "artist",
  title: "Artist",
  type: "document",
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
    {
      name: "profile",
      title: "Profile",
      type: "image",
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
      name: "bio",
      title: "Bio ",
      type: "blockContent",
    },
    {
      name: "bio_cn",
      title: "Bio Chinese ",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
