const project_data = (slug) =>
  `*[slug.current=='${slug}']{name_project,name_project_cn,date,date_cn,artists,artists_cn,location,location_cn, image,layout,'metadata':image.asset->{metadata},image_parameter,introduction,introduction_cn,links_to_project[]{link_title,link_to,'pdf':pdf.asset->url},project_works[]{...,buttons[]{...,"PDF":button_pdf.asset->url}}}`;
const project_page_data = `*[_type=='pages'&&name=='Exhibition'][0]{exhi_dropdown,seo}`;
export { project_data, project_page_data };
