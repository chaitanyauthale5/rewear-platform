import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Upload a file to Firebase Storage and return its public URL
 * @param file File object
 * @param path Path in storage bucket (e.g., 'items/filename.jpg')
 */
export async function uploadFile(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

/**
 * Upload multiple files and return their URLs
 * @param files Array of File objects
 * @param prefix Path prefix (e.g., 'items/userid-')
 */
export async function uploadFiles(files: File[], prefix: string): Promise<string[]> {
  const uploadPromises = files.map((file, i) =>
    uploadFile(file, `${prefix}-${Date.now()}-${i}.${file.name.split('.').pop()}`)
  );
  return await Promise.all(uploadPromises);
}
