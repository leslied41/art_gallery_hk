const exhibition_data = (slug) =>
  `*[slug.current=='${slug}']{name_exo,name_exo_cn,date,date_cn,image,layout,'metadata':image.asset->{metadata},image_parameter,introduction,introduction_cn,exhibition_works[]{...,buttons[]{...,"PDF":button_pdf.asset->url}}}`;
const exhibition_page_data = `*[_type=='pages'&&name=='Exhibition'][0]{exhi_dropdown,seo}`;
export { exhibition_data, exhibition_page_data };
