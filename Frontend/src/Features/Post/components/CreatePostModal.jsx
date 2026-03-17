import { useState, useRef } from "react";
import { usePost } from "../hooks/usePost";

const CreatePostModal = ({ onClose }) => {
    const { handleCreatePost } = usePost();
    const [caption, setCaption] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }
        setError("");
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            setError("Please choose an image to post.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            formData.append("caption", caption);
            await handleCreatePost(formData);
            onClose();
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to create post. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                    <h2 className="text-white font-semibold text-base tracking-tight">Create new post</h2>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1 rounded-full hover:bg-white/10"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                    {/* Image Drop Zone */}
                    {!imagePreview ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            className="flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer transition-all duration-300 py-12"
                            style={{
                                border: `2px dashed ${dragOver ? "#f09433" : "rgba(255,255,255,0.15)"}`,
                                background: dragOver ? "rgba(240,148,51,0.05)" : "rgba(255,255,255,0.03)"
                            }}
                        >
                            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)" }}>
                                <svg className="w-7 h-7 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-white/60 text-sm font-medium">Drag & drop a photo here</p>
                                <p className="text-white/30 text-xs mt-1">or <span className="text-orange-400">browse</span> to choose</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden group">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => { setImagePreview(null); setImageFile(null); }}
                                    className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg border border-white/30 cursor-pointer hover:bg-white/30 transition-colors"
                                >
                                    Change photo
                                </button>
                            </div>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e.target.files[0])}
                        className="hidden"
                    />

                    {/* Caption */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">Caption</label>
                        <textarea
                            rows={3}
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            maxLength={2200}
                            className="w-full px-4 py-3 rounded-xl text-sm text-white resize-none focus:outline-none transition-all duration-200"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}
                            onFocus={(e) => { e.target.style.borderColor = "rgba(240,148,51,0.5)"; }}
                            onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                        />
                        <p className="text-right text-white/20 text-xs">{caption.length}/2200</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !imageFile}
                        className="py-3 rounded-xl text-sm font-bold text-white tracking-wide cursor-pointer active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: loading || !imageFile
                                ? "rgba(255,255,255,0.1)"
                                : "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
                        }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Sharing...
                            </span>
                        ) : "Share Post"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
