import { Link, Outlet } from "react-router-dom";
import supabase from "../utils/supabase";
import useAuthStore from "../stores/useAuthStore";

export default function Layout() {
	const { user } = useAuthStore();

	const handleLogout = async () => {
		await supabase.auth.signOut();
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
									className="text-sm text-gray-900 bg-white border border-gray-300 rounded-lg px-5 py-2.5 hover:bg-gray-100 font-medium">로그아웃</button>
							</>
						) : (
							<>
								<Link to="/login"
									className="text-sm text-gray-900 bg-white border border-gray-300 rounded-lg px-5 py-2.5 hover:bg-gray-100 font-medium"  >로그인</Link>
								<Link to="/signup" className="text-sm text-gray-900 bg-white border border-gray-300 rounded-lg px-5 py-2.5 hover:bg-gray-100 font-medium">회원가입</Link>
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