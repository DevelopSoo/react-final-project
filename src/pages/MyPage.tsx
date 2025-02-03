import { useState } from "react"
import useAuthStore from "../stores/useAuthStore";

export default function MyPage() {
	const { user } = useAuthStore();
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setPreviewImage(e.target?.result as string);
			}
			reader.readAsDataURL(file);
		}
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-8">마이페이지</h1>

			<div className="space-y-6">
				{/* 프로필 이미지 섹션 */}
				<div className="flex items-center space-x-4">
					<div className="relative">
						<img
							src={previewImage || "/default-profile.jpg"}
							alt="프로필 이미지"
							className="w-24 h-24 rounded-full object-cover"
						/>
						<input
							type="file"
							id="profileImage"
							accept="image/*"
							className="hidden"
							onChange={handleFileChange}
						/>
						<label
							htmlFor="profileImage"
							className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 cursor-pointer"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</label>
					</div>
				</div>

				{/* 사용자 정보 폼 */}
				<form className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							이메일
						</label>
						<input
							type="email"
							id="email"
							value={user?.email}
							disabled
							className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-300 text-gray-500 cursor-not-allowed"
						/>
					</div>

					<div>
						<label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
							닉네임
						</label>
						<input
							type="text"
							id="nickname"
							value={user?.nickname}
							// onChange={handleChange}
							placeholder="닉네임을 입력하세요"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							// disabled={isUploading}
							className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
								`}
						>
							{/* {isUploading ? "업로드 중..." : "저장하기"} */}
							저장하기
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}