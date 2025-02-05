import { useState } from "react";
import FeedForm from "../components/FeedForm";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { addFeed } from "../api/feedApi";

export default function CreatePage() {
	const { user } = useAuthStore();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	}

	const addFeedMutation = useMutation({
		mutationFn: async () => {
			if (!user) {
				// 적용 전 
				// alert("로그인 후 이용해주세요.");
				// 적용 후 
				throw new Error("로그인 후 이용해주세요.");
				// return;
			}
			await addFeed({
				title,
				content,
				userId: user.id,
			});
		},
		onSuccess: () => {
			// 페이지 이동
			navigate("/");
		},
		onError: (error) => {
			alert(error.message);
		}
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addFeedMutation.mutate();
	}
	return (
		<FeedForm
			pageTitle="글 추가"
			title={title}
			content={content}
			handleTitleChange={handleTitleChange}
			handleContentChange={handleContentChange}
			handleSubmit={handleSubmit} >
			{/* 적용 전  */}
			{/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">추가</button> */}
			{/* 적용 후  */}
			<button className="btn-primary">추가</button>
		</FeedForm>
	)
}