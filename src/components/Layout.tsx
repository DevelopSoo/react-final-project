import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<>
			<header>헤더</header>
			<Outlet />
		</>
	)
}