import { Link } from "react-router-dom";
import Feed from "../components/Feed";
import { useQuery } from "@tanstack/react-query";
import { getFeeds } from "../api/feedApi";

export default function Home() {
	// 1. supabase에서 가져와서 데이터를 조회
	// 2. 화면에 보여준다.

	const { data, isLoading, error } = useQuery({
		queryKey: ["feeds"],
		queryFn: getFeeds,
	})

	if (isLoading) return <div>로딩 중 ...</div>
	if (error) return <div>에러 발생: {error.message}</div>

	return (
		<>
			<div className="flex justify-between mb-4">
				<h1 className="text-2xl font-bold">글 목록</h1>
				<Link to="/feeds/create" className="bg-blue-500 text-white rounded-md px-4 py-2">글쓰기</Link>
			</div>
			<div className="flex flex-col gap-4">
				{data?.map((item) => (
					<Feed key={item.id} feed={item} />
				))}
			</div>
		</>
	)
}