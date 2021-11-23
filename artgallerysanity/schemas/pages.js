export default {
  name: "pages",
  title: "Pages",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
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
      name: "briefSection",
      title: "Brief Section",
      type: "object",
      hidden: ({ parent }) => parent?.name === "Artist" || "Exhibition",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },

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
          name: "description",
          title: "Description",
          type: "blockContent",
        },
        {
          name: "name_cn",
          title: "Name Chinese",
          type: "string",
          fieldset: "translation",
        },

        {
          name: "description_cn",
          title: "Description Chinese",
          type: "blockContent",
          fieldset: "translation",
        },
      ],
    },

    {
      name: "visitUsSection",
      title: "Visit Us Section",
      type: "object",
      hidden: ({ parent }) => parent?.name != "About",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
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
          name: "description",
          title: "Description",
          type: "blockContent",
        },
        {
          name: "formResponse",
          title: "Form Response",
          type: "blockContent",
        },
        {
          name: "name_cn",
          title: "Name Chinese",
          type: "string",
          fieldset: "translation",
        },

        {
          name: "description_cn",
          title: "Description Chinese",
          type: "blockContent",
          fieldset: "translation",
        },

        {
          name: "formResponse_cn",
          title: "Form Response Chinese",
          type: "blockContent",
          fieldset: "translation",
        },
      ],
    },

    {
      name: "connectSection",
      title: "Connect Section",
      type: "object",
      hidden: ({ parent }) => parent?.name != "About",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
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
          name: "social",
          title: "Social Media",
          type: "array",
          of: [{ type: "reference", to: { type: "socialMedia" } }],
        },

        {
          name: "name_cn",
          title: "Name Chinese",
          type: "string",
          fieldset: "translation",
        },

        {
          name: "description_cn",
          title: "Description Chinese",
          type: "blockContent",
          fieldset: "translation",
        },
      ],
    },

    {
      name: "terminologySection",
      title: "Terminology Section",
      hidden: ({ parent }) => parent?.name != "About",
      type: "object",
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
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
      fields: [
        {
          name: "name",
          title: "Name ",
          type: "string",
        },
        {
          name: "content",
          title: "Content",
          type: "blockContent",
        },
        {
          name: "name_cn",
          title: "Name Chinese",
          type: "string",
          fieldset: "translation",
        },

        {
          name: "content_cn",
          title: "Content Chinese",
          type: "blockContent",
          fieldset: "translation",
        },
      ],
    },

    {
      name: "missionStatementSection",
      title: "Mission Statement Section",
      hidden: ({ parent }) => parent?.name != "About",
      type: "object",
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
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
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
        {
          name: "name_cn",
          title: "Name Chinese",
          type: "string",
          fieldset: "translation",
        },

        {
          name: "content_cn",
          title: "Content Chinese",
          type: "blockContent",
          fieldset: "translation",
        },
      ],
    },
    //exhibition current, future, past
    {
      name: "exhis_dropdown",
      title: "Exhibitions Dropdown Section",
      hidden: ({ parent }) => parent?.name != "Exhibitions",
      type: "object",
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
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
      fields: [
        {
          name: "first_name",
          title: "First Name",
          type: "string",
        },

        {
          name: "second_name",
          title: "Second Name",
          type: "string",
        },

        {
          name: "third_name",
          title: "Third Name",
          type: "string",
        },
        {
          name: "first_name_cn",
          title: "First Name Chinese",
          type: "string",
          fieldset: "translation",
        },
        {
          name: "second_name_cn",
          title: "Second Name Chinese",
          type: "string",
          fieldset: "translation",
        },
        {
          name: "third_name_cn",
          title: "Third Name Chinese",
          type: "string",
          fieldset: "translation",
        },
      ],
    },
    //artist dropdown section, bio, works, exhibtions, interviews
    {
      name: "artist_dropdown",
      title: "Artist Dropdown Section",
      hidden: ({ parent }) => parent?.name != "Artist",
      type: "object",
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
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
      fields: [
        {
          name: "first_name",
          title: "First Name",
          type: "string",
        },

        {
          name: "second_name",
          title: "Second Name",
          type: "string",
        },

        {
          name: "third_name",
          title: "Third Name",
          type: "string",
        },
        {
          name: "fourth_name",
          title: "Fourth Name",
          type: "string",
        },
        {
          name: "first_name_cn",
          title: "First Name Chinese",
          type: "string",
          fieldset: "translation",
        },
        {
          name: "second_name_cn",
          title: "Second Name Chinese",
          type: "string",
          fieldset: "translation",
        },
        {
          name: "third_name_cn",
          title: "Third Name Chinese",
          type: "string",
          fieldset: "translation",
        },
        {
          name: "fourth_name_cn",
          title: "Fourth Name Chinese",
          type: "string",
          fieldset: "translation",
        },
      ],
    },
    //exhibition dropdown section, press release
    {
      name: "exhi_dropdown",
      title: "Exhibition Dropdown Section",
      hidden: ({ parent }) => parent?.name != "Exhibition",
      type: "object",
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
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
      fields: [
        {
          name: "first_name",
          title: "First Name",
          type: "string",
        },

        {
          name: "first_name_cn",
          title: "First Name Chinese",
          type: "string",
          fieldset: "translation",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
