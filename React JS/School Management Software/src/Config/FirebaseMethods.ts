import { getDatabase, onValue, push, ref, set } from "firebase/database";
import app from "./FirebaseConfig";

const db = getDatabase(app);

export const setData = (nodeName: string, data: any) => {
  return new Promise((resolve: any, reject: any) => {
    data.id = push(ref(db, `${nodeName}`)).key;
    const reference = ref(db, `${nodeName}/${data.id}`);
    set(reference, data)
      .then(() => {
        resolve("Successfully Submitted");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getData = (nodeName: string, id?: string) => {
  return new Promise((resolve: any, reject: any) => {
    const reference = ref(db, `${nodeName}/${id ? id : ""}`);
    onValue(reference, (data)=>{
        if (data.exists()) {
            if (id) {
                resolve(data.val())    
            } else {
                resolve(Object.values(data.val()))
            }
        } else {
            reject({message : "Error While Getting the Data"});
        }
    })
  });
};
