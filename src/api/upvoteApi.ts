import supabase from "../utils/supabase";

export const getUpvotesCount = async (feedId: string) => {
  const { count, error } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) throw new Error("좋아요 조회 실패");
  return count;
};
