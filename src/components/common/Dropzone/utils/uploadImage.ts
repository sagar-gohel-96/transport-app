import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";

export interface UploadImageProps {
  file: any;
  setProgresspercent: (value: number) => void;
  setImgUrl: (value: string) => void;
  folderName: string;
}

export const uploadImage = (
  file: any,
  folderName: string,
  setImgUrl: (value: string) => void,
  setProgresspercent: (value: number) => void
) => {
  if (!file) return;
  const storageRef = ref(storage, `/transport/${folderName}/${file[0].path}`);
  const uploadTask = uploadBytesResumable(storageRef, file[0]);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgresspercent(progress);
    },

    (error) => {
      alert(error);
    },

    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL);
        setProgresspercent(0);
      });
    }
  );
};
