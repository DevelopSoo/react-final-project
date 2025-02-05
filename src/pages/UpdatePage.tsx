import { useNavigate, useParams } from "react-router-dom";
import FeedForm from "../components/FeedForm";
import { editFeed, getFeedById } from "../api/feedApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function UpdatePage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const { data } = useQuery({
		queryKey: ["feed", id],
		queryFn: () => {
			if (!id) {
				throw new Error("id가 없습니다.")
			}
			return getFeedById(id)
		},
	});

	useEffect(() => {
		setTitle(data?.title || "");
		setContent(data?.content || "");
	}, [data]);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value)
	}

	const updateFeedMutation = useMutation({
		mutationFn: () => {
			if (!id) {
				throw new Error("id가 없습니다.")
			}
			return editFeed({ id, title, content })
		},
		onSuccess: () => {
			navigate("/")
		},
		onError: (error) => {
			alert(error.message)
		}
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateFeedMutation.mutate();
	}

	return (
		<FeedForm
			pageTitle="글 수정"
			title={title}
			content={content}
			handleTitleChange={handleTitleChange}
			handleContentChange={handleContentChange}
			handleSubmit={handleSubmit}
		>
			{/* 적용 전 */}
			{/* <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">수정</button> */}
			{/* 적용 후 */}
			<button className="btn-warning">수정</button>
		</FeedForm>
	)
}