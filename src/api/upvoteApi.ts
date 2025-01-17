import supabase from "../utils/supabase";

export const getUpvotesByFeedId = async (feedId: string) => {
  const { data, error } = await supabase
    .from("upvotes")
    .select("*")
    .eq("feed_id", feedId);
  if (error) throw new Error("좋아요 조회 실패");
  return data;
};

export const getUpvotesCount = async (feedId: string) => {
  const { count, error } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) throw new Error("좋아요 조회 실패");
  return count;
};

// 1. 좋아요 추가하기 -> 어떤 게시물의 좋아요를 추가할 것인가. 누가 눌렀는가?
export const addUpvote = async ({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) => {
  const { error } = await supabase
    .from("upvotes")
    .insert({ feed_id: feedId, user_id: userId });
  if (error) throw new Error(`좋아요 추가 실패: ${error.message}`);
};

// 2. 좋아요 삭제하기
export const deleteUpvote = async ({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) => {
  const { error } = await supabase
    .from("upvotes")
    .delete()
    .eq("feed_id", feedId)
    .eq("user_id", userId);

  if (error) throw new Error(`좋아요 삭제 실패: ${error.message}`);
};

// 3. 좋아요 토글하기 (추가 <-> 삭제)
export const toggleUpvote = async ({
  feedId,
  userId,
  isUpvoted,
}: {
  feedId: string;
  userId: string;
  isUpvoted: boolean;
}) => {
  // 내가 해당 게시물의 좋아요를 한 적이 없다면 -> 추가한다.
  if (!isUpvoted) {
    await addUpvote({ feedId, userId });
  } else {
    // 내가 해당 게시물의 좋아요를 한 적이 있다면 -> 지운다.
    await deleteUpvote({ feedId, userId });
  }
};
