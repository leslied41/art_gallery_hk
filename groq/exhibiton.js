const exhibitions_page_data = `*[_type=='pages'&&name=='Exhibitions']{briefSection,exhis_dropdown,seo}`;
const current_exhibitions_data = `*[_type=='exhibition'&& exhibition_status=='Current']`;
const future_exhibitions_data = `*[_type=='exhibition'&& exhibition_status=='Future']`;
const past_exhibitions_data = `*[_type=='exhibition'&& exhibition_status=='Past']`;
export {
  exhibitions_page_data,
  current_exhibitions_data,
  future_exhibitions_data,
  past_exhibitions_data,
};
