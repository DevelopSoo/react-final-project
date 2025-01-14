import supabase from "../utils/supabase";

export const getCommentsCount = async (feedId: string) => {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) throw new Error("댓글 조회 실패");
  return count;
};
