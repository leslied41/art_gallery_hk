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
    {
      name: "bio_section",
      title: "Bio Section",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
      },
    },
    {
      name: "works_section",
      title: "Works Section",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
      },
    },
    {
      name: "cv_section",
      title: "CV Section",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
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
      name: "time_for_reorder",
      title: "Time for Reorder",
      type: "datetime",
      description: "the artist with latest time will be on the top",
    },
    {
      name: "profile",
      title: "Profile",
      type: "image",
      description: "display in the bio section",
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
      fieldset: "bio_section",
    },
    {
      name: "bio_collapsed",
      title: "Open ",
      type: "boolean",
      fieldset: "bio_section",
    },
    {
      name: "works_collapsed",
      title: "Open ",
      type: "boolean",
      fieldset: "works_section",
    },
    {
      name: "bio_cn",
      title: "Bio Chinese ",
      type: "blockContent",
      fieldset: "translation",
    },
    {
      name: "cv",
      title: "Title",
      type: "string",
      fieldset: "cv_section",
    },
    {
      name: "cv_link",
      title: "CV Link ",
      type: "url",
      fieldset: "cv_section",
    },
    {
      name: "cv_pdf",
      title: "CV PDF",
      type: "file",
      fieldset: "cv_section",
    },
    {
      name: "cv_create_date",
      title: "Create Date",
      type: "date",
      fieldset: "cv_section",
    },
  ],
  initialValue: () => ({
    cv_create_date: new Date().toISOString(),
  }),

  preview: {
    select: {
      title: "name",
    },
  },
};
