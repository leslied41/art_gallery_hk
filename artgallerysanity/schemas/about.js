export default {
  name: "about",
  title: "About Page",
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
      name: "founder",
      title: "Founder",
      type: "array",
      of: [{ type: "founder" }],
    },

    {
      name: "briefSection",
      title: "Brief Section",
      type: "object",
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
      ],
    },

    {
      name: "visitUsSection",
      title: "Visit Us Section",
      type: "object",
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
          name: "formResponse",
          title: "Form Response",
          type: "blockContent",
        },
        {
          name: "formResponse_cn",
          title: "Form Response Chinese",
          type: "blockContent",
        },
      ],
    },

    {
      name: "connectSection",
      title: "Connect Section",
      type: "object",
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
    },

    {
      name: "terminologySection",
      title: "Terminology Section",
      type: "object",
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
          name: "content",
          title: "Content",
          type: "blockContent",
        },
        {
          name: "content_cn",
          title: "Content Chinese",
          type: "blockContent",
        },
      ],
    },

    {
      name: "missionStatementSection",
      title: "Mission Statement Section",
      type: "object",
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
          name: "content",
          title: "Content",
          type: "blockContent",
        },
        {
          name: "content_cn",
          title: "Content Chinese",
          type: "blockContent",
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
