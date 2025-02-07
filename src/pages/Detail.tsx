import { FaAngleUp, FaCommentDots } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFeed, getFeedById } from "../api/feedApi";
import { getUpvotesByFeedId, toggleUpvote } from "../api/upvoteApi";
import { getCommentsByFeedId } from "../api/commentApi";
import useAuthStore from "../stores/useAuthStore";

export default function Detail() {
	// 1. 주소에 있는 id를 가져와야 한다.
	const { id } = useParams();
	const { user } = useAuthStore();
	const navigate = useNavigate();

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

	// 1. 좋아요 데이터를 가져온다,
	const { data: upvotes, isLoading: isUpvotesLoading } = useQuery({
		// 쿼리키 계층화 적용 전 
		// queryKey: ["upvotes", id],
		// 쿼리키 계층화 적용 후 
		queryKey: ["feeds", id, "upvotes"],
		queryFn: () => {
			if (!id) {
				throw new Error("id가 없습니다.")
			}
			return getUpvotesByFeedId(id)
		}
	});

	// 2. 내가 좋아요 했는지 확인한다.
	const isUpvotedByMe = upvotes?.some((upvote) => upvote.user_id === user?.id)

	const queryClient = useQueryClient();
	// 3. 좋아요 추가 혹은 삭제를 한다.
	const toggleMutation = useMutation({
		mutationFn: async () => {
			// 에러 처리 통일하기?
			if (!user) {
				// 적용 전
				// alert("로그인 후 이용해주세요.")
				// 적용 후 
				throw new Error("로그인 후 이용해주세요.")
			}

			if (data.user_id === user.id) {
				// 적용 전
				// alert("작성자는 좋아요를 누를 수 없습니다.")
				// 적용 후 
				throw new Error("작성자는 좋아요를 누를 수 없습니다.")
				// return
			}
			// 내가 좋아요를 누른 적이 있는지 확인 
			// 좋아요 데이터를 다 가져온 후 -> 내가 한 게 있는지 체크 
			if (!id || isUpvotedByMe === undefined) {
				// 적용 전
				// alert("좋아요 데이터를 불러오는 중 오류가 발생했습니다.")
				// 적용 후 
				throw new Error("좋아요 데이터를 불러오는 중 오류가 발생했습니다.")
				// return
			}
			// 내가 현재 좋아요를 한 상태면 -> 좋아요 취소
			// 내가 현재 좋아요를 하지 않은 상태면 -> 좋아요 추가
			await toggleUpvote({ feedId: id, userId: user.id, isUpvoted: isUpvotedByMe });
		},
		onSuccess: () => {
			// 쿼리키 계층화 적용 전 
			// queryClient.invalidateQueries({ queryKey: ["upvotes", id] })
			// 쿼리키 계층화 적용 후 
			queryClient.invalidateQueries({ queryKey: ["feeds", id, "upvotes"] })
		},
		onError: (error) => {
			// 적용 전
			alert(`좋아요 추가 혹은 삭제 실패: ${error.message}`)
		}
	});

	const deleteMutation = useMutation({
		mutationFn: async () => {
			// 게시물의 아이디가 일치하는 걸 삭제한다.
			// & 유저 아이디가 일치하는 걸 삭제한다. 
			// 타입 체크를 미리 한다.
			if (!id) {
				throw new Error("id가 없습니다.")
			}
			if (!user) {
				throw new Error("유저 정보가 없습니다.")
			}

			await deleteFeed({
				id,
				userId: user.id
			})
		},
		onSuccess: () => {
			navigate("/")
		},
		onError: (error) => {
			alert(`삭제 실패: ${error.message}`)
		}
	});

	const handleDelete = () => {
		if (!window.confirm("정말로 삭제하시겠습니까?")) {
			return;
		}
		deleteMutation.mutate();
	}

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
				{
					user?.id === data?.user_id && (
						<div className="flex gap-2">
							<Link to={`/feeds/update/${data.id}`} className="bg-yellow-500 text-white rounded-md px-4 py-2">수정</Link>
							<button
								onClick={handleDelete}
								className="bg-red-500 text-white rounded-md px-4 py-2">삭제</button>
						</div>
					)
				}
			</div>

			{/* 글 내용 */}
			<div className="flex items-center justify-between bg-white p-6 rounded-lg">
				<button
					onClick={() => toggleMutation.mutate()}
					className="bg-gray-100 p-3 rounded-lg text-sm text-blue-950">
					<FaAngleUp />
					<div>{
						isUpvotesLoading ?
							<div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div>
							: <span className={`font-bold ${isUpvotedByMe ? "text-red-500" : ""}`}>{upvotes?.length}</span>}
					</div>
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
			<CommentForm feedId={id} />
		</div>
	)
}