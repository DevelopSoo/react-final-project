import { Link } from "react-router-dom";
import Feed from "../components/Feed";

export default function Home() {
	return (
		// 1. 화면의 중앙
		// 2. 최대 너비 제한 
		<>
			{/* 좌우배치: 부모에 display flex 적용하면 됨  */}
			{/* 양쪽 쫙 펼치기: justify-between */}
			<div className="flex justify-between mb-4">
				<h1 className="text-2xl font-bold">글 목록</h1>
				<Link to="/feeds/create" className="bg-blue-500 text-white rounded-md px-4 py-2">글쓰기</Link>
			</div>
			<div className="flex flex-col gap-4">
				<Feed />
				<Feed />
				<Feed />
			</div>
		</>
	)
}