import { Link, Outlet } from "react-router-dom";
import supabase from "../utils/supabase";
import useAuthStore from "../stores/useAuthStore";

export default function Layout() {
	// TODO: useAuthStore 사용 시 구독할 데이터 구체화하기 
	// 전
	// const { user } = useAuthStore();
	// 후
	const user = useAuthStore((state) => state.user);

	// TODO: 에러 처리 
	const handleLogout = async () => {
		// 전
		// await supabase.auth.signOut();

		// 후
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert(`로그아웃에 실패했습니다. ${error.message}`);
		}
	}
	return (
		<>
			<header className="flex justify-between bg-white p-4 border-b border-gray-200 items-center" >
				<Link to="/">
					<img src="/logo.svg" alt="logo" />
				</Link>
				<div className="flex gap-2 items-center">
					{
						user ? (
							<>
								<Link to="/mypage" className="hover:underline">{user.nickname}</Link>
								<button
									onClick={handleLogout}
									// TODO: 반복되는 css 변경 -> index.css에 적용 
									className="btn-outline">로그아웃</button>
							</>
						) : (
							<>
								<Link to="/login"
									// TODO: 반복되는 css 변경 -> index.css에 적용 
									className="btn-outline">로그인</Link>
								{/* TODO: 반복되는 css 변경 -> index.css에 적용  */}
								<Link to="/signup" className="btn-outline">회원가입</Link>
							</>
						)
					}
				</div>
			</header>
			<div className="max-w-screen-lg mx-auto px-10 mt-10">
				<Outlet />
			</div>
		</>
	)
}