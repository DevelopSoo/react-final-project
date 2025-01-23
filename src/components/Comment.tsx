import { IoPersonCircleOutline } from "react-icons/io5";
import useAuthStore from "../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, editComment } from "../api/commentApi";
import { useState } from "react";

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
	const { user } = useAuthStore();
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(comment.content);

	// 수정 버튼 클릭 시 isEditing을 true로 변경하는 함수 
	// -> 내용을 textarea로 바꿔주기
	const handleEdit = () => {
		setIsEditing(true);
	}

	const handleEditCancel = () => {
		setIsEditing(false);
		setEditContent(comment.content)
	}



	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: () => deleteComment(comment.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["feeds", comment.feed_id, "comments"]
			});
		}
	});

	const editMutation = useMutation({
		mutationFn: () => editComment({
			content: editContent,
			commentId: comment.id,
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["feeds", comment.feed_id, "comments"]
			});
			// textarea를 닫기
			setIsEditing(false);
		},
		onError: (error) => {
			alert(`댓글 수정 실패: ${error.message}`);
		}
	})

	const handleDelete = () => {
		if (confirm("정말 삭제하시겠습니까?")) {
			deleteMutation.mutate();
		}
	}

	const handleEditSubmit = () => {
		editMutation.mutate();
	}
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
					{isEditing ?
						<textarea
							value={editContent}
							onChange={(e) => setEditContent(e.target.value)}
							className="text-gray-500 border border-gray-400 p-2 rounded-md resize-none text-sm" />
						: <div className="text-gray-500">{comment.content}</div>}

				</div>
				{/* 내가 로그인한 경우에만 보인다. */}
				{user?.id === comment.user_id ?
					(<div className="flex items-end gap-2">
						{isEditing ? (<>
							<button
								onClick={handleEditCancel}
								className="text-white bg-gray-500 px-4 py-2 rounded-md"
							>
								취소
							</button>
							<button
								onClick={handleEditSubmit}
								className="text-white bg-yellow-500 px-4 py-2 rounded-md"
							>
								완료
							</button>
						</>) : (<>
							<button
								onClick={handleEdit}
								className="text-white bg-yellow-500 px-4 py-2 rounded-md"
							>
								수정
							</button>
							<button
								onClick={handleDelete}
								className="text-white bg-red-500 px-4 py-2 rounded-md"
							>
								삭제
							</button>
						</>)}

					</div>
					) : null}
			</div>
			<hr className="m-0 border-t border-gray-200" />
		</>
	)
}