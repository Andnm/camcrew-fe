export async function uploadToCloudinary(file, folder = "services_videos") {
    try {
        const cloudName =
            import.meta.env.VITE_CLOUD_NAME;
        const uploadPreset =
            import.meta.env.VITE_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", folder);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
                method: "POST",
                body: formData,
            }
        );
        console.log("res: ", res)

        const data = await res.json();
        return {
            url: data.secure_url,
            publicId: data.public_id,
            originalName: file.name,
        };
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}