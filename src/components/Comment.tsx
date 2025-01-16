import { IoPersonCircleOutline } from "react-icons/io5";

interface CommentProps {
	id: string;
	content: string;
	created_at: string;
	feed_id: string;
	user_id: string;
	user: {
		id: string;
		nickname: string;
		email: string;
		img_url: string;
	}
}

export default function Comment({ comment }: { comment: CommentProps }) {
	return (
		<>
			<div className="flex gap-2.5">
				{comment.user.img_url ?
					<img src={comment.user.img_url} alt="profile" className="w-12 h-12 rounded-full mr-6" /> :
					<IoPersonCircleOutline className="w-12 h-12 rounded-full mr-6" />}
				<div className="flex flex-1 flex-col gap-3">
					<div className="flex flex-col gap-1">
						<div className="text-slate-900 font-bold text-sm">
							{comment.user.nickname ? comment.user.nickname : comment.user.email}
						</div>
					</div>
					<div className="text-gray-500">{comment.content}</div>
				</div>
				<div className="flex items-end gap-2">
					<button
						className="text-white bg-yellow-500 px-4 py-2 rounded-md"
					>
						수정
					</button>
					<button
						className="text-white bg-red-500 px-4 py-2 rounded-md"
					>
						삭제
					</button>
				</div>
			</div>
			<hr className="m-0 border-t border-gray-200" />
		</>
	)
}