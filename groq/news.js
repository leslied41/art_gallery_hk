const news_page_data = `*[_type=='pages'&&name=='News']{briefSection,seo,news_list_reorder}[0]`;
const news_data = `*[_type=='news']`;
export { news_data, news_page_data };
