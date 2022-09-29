const recommended_page_data = `*[_type=='pages'&&name=='Recommended']{briefSection,seo,recommend_list,recommend_list_reorder}[0]`;
const recommended_settings_data = `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`;
export { recommended_page_data, recommended_settings_data };
