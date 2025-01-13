import supabase from "../utils/supabase";

export const getFeeds = async () => {
  const { data, error } = await supabase.from("feeds").select("*");
  if (error) {
    throw new Error(
      `feed 데이터를 조회하는 중 에러가 발생했습니다. ${error.message}`
    );
  }
  return data;
};
