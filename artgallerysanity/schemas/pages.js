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

    {
      name: "missionStatementSection",
      title: "Mission Statement Section",
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
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
