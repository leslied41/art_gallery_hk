const study_about_page_data = `*[_type=='pages'&&name=='Study_About'][0]{briefSection, collapsable_first,collapsable_second,collapsable_third,seo}`;
const study_about_settings_data = `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`;
export { study_about_page_data, study_about_settings_data };
