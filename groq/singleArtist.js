const artist_page_data = `*[_type=='pages'&&name=='Artist'][0]{artist_dropdown,seo,press_list_reorder}`;
const artist_data = (slug) => `*[slug.current=='${slug}']{
    ...,
    "PDF": cv_pdf.asset->url
  }`;
const work_images_data = (slug) =>
  `*[_type=='work'&& references(*[slug.current=='${slug}']{_id}[0]._id)]{image,image_parameter,'metadata':image.asset->{metadata}}`;
const interviews_data = (slug) =>
  `*[_type=='interviews'&& references(*[slug.current=='${slug}']{_id}[0]._id)]`;

export { artist_page_data, artist_data, work_images_data, interviews_data };
