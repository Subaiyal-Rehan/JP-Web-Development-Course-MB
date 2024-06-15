import { getDatabase, onValue, push, ref, set } from "firebase/database";
import app from "./FirebaseConfig";

const db = getDatabase(app);

export const setData = (nodeName: any, data: any, nodeId?: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    let id = nodeId ? nodeId : push(ref(db, `${nodeName}`)).key;
    data.id = id;
    const reference = ref(db, `${nodeName}/${id}`);
    set(reference, data)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const getData = (nodeName: any, id?: any) => {
  return new Promise((resolve, reject) => {
    const reference = ref(db, `${nodeName}/${id ? id : ""}`);
    onValue(
      reference,
      (data) => {
        resolve(data.val());
      },
      reject
    );
  });
};
