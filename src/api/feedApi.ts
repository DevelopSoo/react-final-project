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

export const addFeed = async ({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) => {
  const { error } = await supabase.from("feeds").insert({
    title,
    content,
    user_id: userId,
  });

  if (error) {
    throw new Error(`feed 추가 중 에러가 발생했습니다. ${error.message}`);
  }
};

export const editFeed = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  const { error } = await supabase
    .from("feeds")
    .update({
      title,
      content,
    })
    .eq("id", id);
  if (error) {
    throw new Error(`feed 수정 중 에러가 발생했습니다. ${error.message}`);
  }
};

export const deleteFeed = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const { error } = await supabase
    .from("feeds")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) {
    throw new Error(`feed 삭제 중 에러가 발생했습니다. ${error.message}`);
  }
};
