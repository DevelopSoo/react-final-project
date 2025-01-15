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

export const getFeedById = async (id: string) => {
  const { data, error } = await supabase.from("feeds").select("*").eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  if (data.length === 0) {
    throw new Error("해당 글이 존재하지 않습니다.");
  }
  return data[0];
};
