const press_page_data = `*[_type=='pages'&&name=='Gallery Press'][0]{briefSection, seo, press_list[]->}`;
const press_settings_data = `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`;
export { press_settings_data, press_page_data };
