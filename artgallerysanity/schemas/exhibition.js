export default {
  name: "exhibition",
  title: "Exhibitions",
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
      name: "name_exo",
      title: "Name",
      type: "string",
    },
    {
      name: "name_exo_cn",
      title: "Name Chinese",
      type: "string",
      fieldset: "translation",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name_exo",
        maxLength: 96,
      },
    },
    {
      name: "exhibition_status",
      title: "Exhibitions Status",
      type: "string",
      options: {
        list: [
          { title: "current", value: "Current" },
          { title: "future", value: "Future" },
          { title: "past", value: "Past" },
        ],
      },
    },

    {
      name: "introduction",
      title: "Introduction",
      type: "blockContent",
    },
    {
      name: "date",
      title: "Date",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "layout",
      title: "Image Layout",
      type: "string",
      options: {
        list: [
          { title: "Full Width", value: "vertical" },
          { title: "Half Width", value: "horizontal" },
        ],
      },
    },
    {
      name: "image_parameter",
      title: "Image Parameter",
      type: "blockContent",
    },
    {
      name: "date_cn",
      title: "Date Chinese",
      type: "string",
      fieldset: "translation",
    },

    {
      name: "introduction_cn",
      title: "Introduction Chinese",
      type: "blockContent",
      fieldset: "translation",
    },
    {
      name: "exhibition_works",
      title: "Exhibition Works",
      type: "array",
      of: [
        {
          name: "exhibition_work",
          title: "Work",
          type: "object",
          fields: [
            { name: "work_image", title: "Image", type: "image" },
            {
              name: "video_url",
              title: "video",
              type: "url",
            },
            {
              name: "layout",
              title: "Layout",
              type: "string",
              initialValue: "vertical",
              options: {
                list: [
                  { title: "Full Width", value: "vertical" },
                  { title: "Half Width", value: "horizontal" },
                ],
              },
            },
            {
              name: "name",
              title: "Work Name",
              type: "string",
            },
            {
              name: "name_cn",
              title: "Work Name Chinese",
              type: "string",
            },
            {
              name: "introduction",
              title: "Introduction ",
              type: "blockContent",
            },
            {
              name: "introduction_cn",
              title: "Introduction Chinese ",
              type: "blockContent",
            },
            {
              name: "work_parameter",
              title: "Work parameter ",
              type: "blockContent",
            },
            {
              name: "buttons",
              title: "Button Group ",
              type: "array",
              of: [
                {
                  name: "custom_button",
                  title: "Button",
                  type: "object",
                  fields: [
                    {
                      name: "button_name",
                      title: "Button Title",
                      type: "string",
                    },
                    { name: "button_link", title: "Link To", type: "url" },
                    {
                      name: "button_pdf",
                      title: "PDF",
                      type: "file",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // {
    //   name: "press",
    //   title: "Press Releases",
    //   type: "array",
    //   of: [
    //     {
    //       name: "release",
    //       title: "Release",
    //       type: "object",
    //       fields: [
    //         { name: "release_name", title: "Title", type: "string" },
    //         { name: "release_lead", title: "Lead", type: "text" },
    //         { name: "release_link", title: "Link", type: "url" },
    //         {
    //           name: "release_pdf",
    //           title: "Press PDF",
    //           type: "file",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
  preview: {
    select: {
      title: "name_exo",
    },
  },
};
