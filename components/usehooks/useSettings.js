import useSWR from "swr";
import sanityClient from "../../client.js";
import groq from "groq";

export const useSettings = () => {
  const { data, error } = useSWR(
    groq`*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`,
    (query) => sanityClient.fetch(query)
  );
  return {
    settings: data,
    isLoading: !error && !data,
    isError: error,
  };
};
