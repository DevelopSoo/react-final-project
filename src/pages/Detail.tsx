import { FaAngleUp, FaCommentDots } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

export default function Detail() {
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
					<div>2</div>
				</button>

				<div className="flex-1 px-10 min-w-0 flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-gray-900 text-xl font-bold">제목</h2>
						<p className="text-gray-600">내용asdfaskdfasjdfhjkashdfjlkashdljfkhasldkjfhlskdjfhlaksjdhfkd</p>
					</div>
					<p className="text-xs text-right text-gray-600">
						작성일: 2024.12.12
					</p>
				</div>

				<div className="flex items-center gap-1 p-3">
					<FaCommentDots className="text-gray-500 font-bold text-xl " />
					<div className="text-blue-950 font-bold text-sm" >
						12
					</div>
				</div>
			</div>

			{/* 댓글 목록 */}
			<div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
				<h3 className="text-blue-950 font-semibold">12 Comments</h3>
				<Comment />
				<Comment />
				<Comment />
			</div>

			{/* 댓글 작성 폼  */}
			<CommentForm />
		</div>
	)
}