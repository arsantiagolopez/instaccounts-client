import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostEntity } from "../entities";

// previewImages: string[];
//   setPreviewImages:;

interface UseAccounts {
  previews: Partial<PostEntity>[];
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const usePreviewPosts = (): UseAccounts => {
  const [previews, setPreviews] = useState<Partial<PostEntity>[]>([]);
  const [images, setImages] = useState<string[]>([]);

  // Create partial posts with required data for display
  useEffect(() => {
    if (images.length) {
      images.map((image) => {
        const previewExists = previews.some((post) => post.image === image);
        if (!previewExists) {
          const newPreview = {
            id: v4(),
            image,
            likes: 0,
            comments: 0,
            isPreview: true,
          };
          setPreviews([...previews, newPreview]);
        }
      });
    } else {
      setPreviews([]);
    }
  }, [images]);

  return { previews, images, setImages };
};

export { usePreviewPosts };
