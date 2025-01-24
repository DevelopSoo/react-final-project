export default function FeedForm({
	pageTitle,
	children,
	title,
	content,
	handleTitleChange,
	handleContentChange,
	handleSubmit,
}: {
	pageTitle: string;
	children: React.ReactNode;
	title: string;
	content: string;
	handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="title" className="text-lg font-bold text-gray-800">
						제목
					</label>
					<input
						value={title}
						onChange={handleTitleChange}
						type="text"
						name="title"
						id="title"
						placeholder="제목"
						className="p-3 rounded-lg border border-gray-300"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="content" className="text-lg font-bold text-gray-800">
						내용
					</label>
					<textarea
						value={content}
						onChange={handleContentChange}
						id="content"
						name="content"
						placeholder="내용"
						className="p-3 rounded-lg border border-gray-300 h-[400px] resize-none"
					/>
				</div>
				{children}
			</form>
		</div>
	)
}