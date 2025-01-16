import { FaAngleUp, FaCommentDots } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useQuery } from "@tanstack/react-query";
import { getFeedById } from "../api/feedApi";
import { getUpvotesCount } from "../api/upvoteApi";
import { getCommentsByFeedId } from "../api/commentApi";

export default function Detail() {
	// 1. 주소에 있는 id를 가져와야 한다.
	const { id } = useParams();

	// 2. id를 이용하여 API를 요청한다.
	const { data, isLoading, error } = useQuery({
		queryKey: ["feeds", id],
		queryFn: () => {
			if (!id) {
				throw new Error("id가 없습니다.")
			}
			return getFeedById(id)
		}
	});

	// 게시물의 id가 일치하는 댓글들을 가져온다. 
	const { data: comments, isLoading: isCommentsLoading } = useQuery({
		// 이름표 
		// 리액트 쿼리 개발자들이 이 이름표 이용 -> 캐싱 (임시저장) 
		queryKey: ["feeds", id, "comments"],
		queryFn: () => {
			if (!id) {
				throw new Error("id가 없습니다.")
			}
			return getCommentsByFeedId(id)
		}
	});

	const { data: upvotesCount, isLoading: isUpvotesLoading } = useQuery({
		queryKey: ["upvotes", id],
		queryFn: () => {
			if (!id) {
				throw new Error("id가 없습니다.")
			}
			return getUpvotesCount(id)
		}
	})


	if (isLoading) return <div>로딩 중 ...</div>
	if (error) return <div>에러 발생: {error.message}</div>

	return (
		<div className="flex flex-col gap-8">
			{/* 뒤로가기 버튼 & 수정, 삭제 버튼  */}
			<div className="flex justify-between items-center">
				{/* navigate(-1) */}
				<Link to="/" className="flex gap-2 text-sm">
					<span className="text-blue-900 font-bold">{`<`}</span>
					<span className="text-gray-600">뒤로가기</span>
				</Link>
				{/* 수정, 삭제 버튼 */}
				<div className="flex gap-2">
					<Link to="/feeds/update/1" className="bg-yellow-500 text-white rounded-md px-4 py-2">수정</Link>
					<button className="bg-red-500 text-white rounded-md px-4 py-2">삭제</button>
				</div>
			</div>

			{/* 글 내용 */}
			<div className="flex items-center justify-between bg-white p-6 rounded-lg">
				<button className="bg-gray-100 p-3 rounded-lg text-sm text-blue-950">
					<FaAngleUp />
					<div>{isUpvotesLoading ? <div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div> : upvotesCount}</div>
				</button>

				<div className="flex-1 px-10 min-w-0 flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						{/* API를 받아온 후에 보여주고 싶다. */}
						<h2 className="text-gray-900 text-xl font-bold">{data.title}</h2>
						<p className="text-gray-600">{data.content}</p>
					</div>
					<p className="text-xs text-right text-gray-600">
						작성일: {new Date(data.created_at).toLocaleDateString()}
					</p>
				</div>

				<div className="flex items-center gap-1 p-3">
					<FaCommentDots className="text-gray-500 font-bold text-xl " />
					<div className="text-blue-950 font-bold text-sm" >
						{isCommentsLoading ? <div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div> : comments?.length}
					</div>
				</div>
			</div>

			{/* 댓글 목록 */}
			<div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
				<h3 className="text-blue-950 font-semibold">
					{isCommentsLoading ? <div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div> : comments?.length} Comments
				</h3>
				{comments?.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</div>

			{/* 댓글 작성 폼  */}
			<CommentForm />
		</div>
	)
}