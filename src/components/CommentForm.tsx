import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import useAuthStore from "../stores/useAuthStore";
import { addComment } from "../api/commentApi";

export default function CommentForm({
	feedId
}: {
	feedId: string | undefined;
}) {
	const [comment, setComment] = useState("");
	const { user } = useAuthStore();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	}

	const queryClient = useQueryClient();
	const addCommentMutation = useMutation({
		mutationFn: async () => {
			if (!user) {
				throw new Error("로그인 후 이용해주세요.");
			}

			if (!feedId) {
				throw new Error("게시물 아이디가 없습니다.");
			}

			await addComment({
				feedId,
				userId: user.id,
				content: comment,
			})

		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds", feedId, "comments"] })
		},
		onError: (error) => {
			alert(error.message);
		}
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// supabase 코드
		addCommentMutation.mutate();
	}

	return (
		<div className="flex flex-col gap-3 bg-white shadow-md p-6 rounded-lg">
			<h2 className="text-blue-950 font-semibold">댓글 작성</h2>
			<form
				className="flex flex-col gap-3"
				onSubmit={handleSubmit}
			>
				<textarea
					className="border border-gray-200 rounded-lg h-[100px] p-3 resize-none"
					value={comment}
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="self-end px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
				>
					작성
				</button>
			</form>
		</div>
	)
}