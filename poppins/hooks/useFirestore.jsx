import { useState, useEffect } from "react";
import { projFirestore } from "../firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";

const useFirestore = () => {
  const [docs, setDocs] = useState([{ kidsDocs: [], parentsDocs: [] }])

  useEffect(() => {
    const kidsCollectionRef = collection(projFirestore, 'kids');
    const parentsCollectionRef = collection(projFirestore, 'parents');

    const kidsDocumentsQ = query(kidsCollectionRef)
    const parentsDocumentsQ = query(parentsCollectionRef);
    
    const kidsUnsub = onSnapshot(kidsDocumentsQ, (querySnapshot) => {
      let kidsDocuments = [];
      querySnapshot.forEach((doc) => {
        kidsDocuments.push({...doc.data(), id: doc.id})
      });
      setDocs(prevState => ({ ...prevState, kidsDocs: kidsDocuments }));
    });

    const parentsUnsub = onSnapshot(parentsDocumentsQ, (querySnapshot) => {
      let parentsDocuments = [];
      querySnapshot.forEach((parentDoc) => {
        parentsDocuments.push({...parentDoc.data(), id: parentDoc.id})
      });
      setDocs(prevState => ({ ...prevState, parentsDocs: parentsDocuments }));
    })

    return () => {
      kidsUnsub();
      parentsUnsub();
    }

  }, [])

  return docs;

};

export default useFirestore;