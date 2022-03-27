export default {
  name: "pages",
  title: "Pages",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "This name cannot be changed! Oherwise, the corresponding page will crash!!!",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Please do not change the slug!!!",
      options: {
        source: "name",
        maxLength: 96,
      },
    },

    {
      name: "briefSection",
      title: "Brief Section",
      type: "object",
      hidden: ({ parent }) =>
        ["Artist", "Landing", "Exhibition"].includes(parent?.name),
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
        {
          name: "form",
          title: "Form",
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
          name: "font_size",
          title: "Font Size",
          type: "number",
          description: "to determine the font size of this section's titlte",
        },
        {
          name: "description",
          title: "Description",
          type: "blockContent",
        },

        {
          name: "full_name",
          title: "Full Name",
          type: "string",
          fieldset: "form",
        },
        {
          name: "full_name_cn",
          title: "Full Name Chinese",
          type: "string",
          fieldset: "form",
        },
        {
          name: "date",
          title: "Date",
          type: "string",
          fieldset: "form",
        },
        {
          name: "date_cn",
          title: "Date Chinese",
          type: "string",
          fieldset: "form",
        },
        {
          name: "head_count",
          title: "Head Count",
          type: "string",
          fieldset: "form",
        },
        {
          name: "head_count_cn",
          title: "Head Count Chinese",
          type: "string",
          fieldset: "form",
        },
        // {
        //   name: "event",
        //   title: "Event",
        //   type: "string",
        //   fieldset: "form",
        // },
        // {
        //   name: "event_cn",
        //   title: "Event Chinese",
        //   type: "string",
        //   fieldset: "form",
        // },
        {
          name: "remarks",
          title: "Remarks",
          type: "string",
          fieldset: "form",
        },
        {
          name: "remarks_cn",
          title: "Remakrs Chinese",
          type: "string",
          fieldset: "form",
        },
        {
          name: "form_email",
          title: "Email",
          type: "string",
          fieldset: "form",
        },
        {
          name: "form_email_cn",
          title: "Email Chinese",
          type: "string",
          fieldset: "form",
        },
        {
          name: "response",
          title: "Response",
          type: "blockContent",
          fieldset: "form",
        },
        {
          name: "response_cn",
          title: "Response Chinese",
          type: "blockContent",
          fieldset: "form",
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
          name: "font_size",
          title: "Font Size",
          type: "number",
          description: "to determine the font size of this section's titlte",
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
          name: "hidden",
          title: "Hidden ",
          type: "boolean",
        },
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
          name: "hidden",
          title: "Hidden ",
          type: "boolean",
        },
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
    //news page reorder news list
    {
      name: "news_list_reorder",
      title: "Chronologically/Reverse Chronologically",
      description:
        "reorder the news list chronologically or reverse chronologically.",

      type: "boolean",
      hidden: ({ parent }) => parent?.name != "News",
    },
    //artists page reorder the artists list option
    {
      name: "artists_list_reorder",
      title: "Order by Alphabetic",
      description: "reorder the artist list by alphabetic.",
      hidden: ({ parent }) => parent?.name != "Artists",
      type: "boolean",
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
    //seo and social medial sharing
    {
      name: "seo",
      title: "SEO & Social Sharing",
      type: "object",
      description: "A fallback for pages that does not include these metadata",
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
          name: "url",
          title: "Site Url",
          type: "url",
        },
        {
          name: "description",
          title: "Description",
          type: "string",
          description:
            "Describe your social media for social engine and social media",
        },
        {
          name: "description_cn",
          title: "Description Chinese",
          type: "string",
          description:
            "Describe your social media for social engine and social media",
          fieldset: "translation",
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "tags",
          description:
            "Add keywords that describe your website to seach engine",
        },
        {
          name: "keywords_cn",
          title: "Keywords Chinese",
          type: "tags",
          description:
            "Add keywords that describe your website to seach engine",
          fieldset: "translation",
        },
        {
          name: "preview_image",
          title: "Preview Image",
          type: "image",
          description: "Preview image for social media sharing",
        },
      ],
    },
    //study about page collapsable section
    {
      name: "collapsable_first",
      title: "Collapsable One",
      hidden: ({ parent }) => parent?.name != "Study_About",
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
          name: "hidden",
          title: "Hidden ",
          type: "boolean",
        },
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
      name: "collapsable_second",
      title: "Collapsable Two",
      hidden: ({ parent }) => parent?.name != "Study_About",
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
          name: "hidden",
          title: "Hidden ",
          type: "boolean",
        },
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
      name: "collapsable_third",
      title: "Collapsable Three",
      hidden: ({ parent }) => parent?.name != "Study_About",
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
          name: "hidden",
          title: "Hidden ",
          type: "boolean",
        },
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
    //only appearing in study press page
    {
      name: "press_list",
      title: "Press List",
      hidden: ({ parent }) => parent?.name != "Gallery Press",
      type: "array",
      of: [{ type: "reference", to: { type: "interviews" } }],
    },
    //only appearing in study recommended page
    {
      name: "recommend_list_reorder",
      title: "Chronologically/Reverse Chronologically",
      description:
        "reorder the recommendation list chronologically or reverse chronologically.",

      type: "boolean",
      hidden: ({ parent }) => parent?.name != "Recommended",
    },
    {
      name: "recommend_list",
      title: "Recommend List",
      hidden: ({ parent }) => parent?.name != "Recommended",
      type: "array",
      of: [
        {
          name: "Recommened",
          title: "recommended_item",
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
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "publication_time",
              title: "Publication Time",
              type: "datetime",
            },
            {
              name: "title_cn",
              title: "Title Chinses",
              type: "string",
              fieldset: "translation",
            },
            { name: "news_link", title: "Item Link", type: "url" },
            { name: "news_brief", title: "Item Brief", type: "blockContent" },
            {
              name: "news_brief_cn",
              title: "Item Brief Chinese",
              type: "blockContent",
              fieldset: "translation",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
            },
          ],
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
