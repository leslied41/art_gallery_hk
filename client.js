import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "z3dq9mvc",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-12-28",
});
