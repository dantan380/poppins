import { useState, useEffect } from "react";
import { projFirestore } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useFirestore = () => {
  const [docs, setDocs] = useState([{ kidsDocs: [], parentsDocs: [], familiesDocs: [] }])

  useEffect(() => {
    const kidsCollectionRef = collection(projFirestore, 'kids');
    const parentsCollectionRef = collection(projFirestore, 'parents');
    const familiesCollectionRef = collection(projFirestore, "families");

    const kidsDocumentsQ = query(kidsCollectionRef, where("lastName", "==", "Smith"))
    const parentsDocumentsQ = query(parentsCollectionRef);
    const familiesDocumentsQ = query(familiesCollectionRef);
    
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

    const familiesUnsub = onSnapshot(familiesDocumentsQ, (querySnapshot) => {
      let familiesDocuments = [];
      querySnapshot.forEach((familyDoc) => {
        familiesDocuments.push({...familyDoc.data(), id: familyDoc.id})
      });
      setDocs(prevState => ({ ...prevState, familiesDocs: familiesDocuments}));
    })

    return () => {
      kidsUnsub();
      parentsUnsub();
      familiesUnsub();
    }

  }, [])

  return docs;

};

export default useFirestore;