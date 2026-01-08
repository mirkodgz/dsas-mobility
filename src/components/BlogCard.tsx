

interface BlogPostProps {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    author: string;
}

export default function BlogCard({ post }: { post: BlogPostProps }) {
    return (
        <div className="bg-white rounded-card shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1 group">
            {/* IMAGE AREA */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded bg-blue-50 text-primary text-xs font-bold uppercase tracking-wide border border-blue-100 mb-3">
                        {post.category}
                    </span>
                    <h2 className="text-secondary font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                {/* FOOTER METADATA */}
                <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                        <span>{post.author}</span>
                    </div>
                    <span>{post.date}</span>
                </div>
            </div>
        </div>
    );
}
