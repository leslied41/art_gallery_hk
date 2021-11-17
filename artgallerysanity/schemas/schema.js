// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import socialMedia from "./socialMedia";
import footer from "./settings";

import work from "./work.js";
import settings from "./settings";
import exhibition from "./exhibition";
import artist from "./artist.js";
import news from "./news.js";
import interview from "./interview";
import pages from "./pages";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.

    settings,
    pages,
    socialMedia,
    interview,

    exhibition,
    work,
    artist,
    news,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
});
