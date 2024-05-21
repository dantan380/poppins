import { projFirestore } from "../../../firebase/config";
import { collection, query, where, getDocs, documentId, doc, getDoc } from "firebase/firestore";

const familyFetcher = {

  /*
    Fetch all the member documents for a given family name
  */
  getFamilies: async (queryInput) => {
    const familiesCollectionRef = collection(projFirestore, "families");
    const familyQuery = query(familiesCollectionRef, where("familyName", "==", queryInput.familyName));

    let familiesDocuments = [];

    const querySnapshot = await getDocs(familyQuery);
    querySnapshot.forEach((familyDoc) => {
      familiesDocuments.push({...familyDoc.data(), id: familyDoc.id})
    });
    
    return familiesDocuments;
  },

  getFamilyMembers: async (familyId) => {
    const familyDocRef = doc(projFirestore, "families", familyId);
    const familyDoc = await getDoc(familyDocRef);
    if (!familyDoc.exists()) {
      throw new Error("Family not found");
    }

    const family = familyDoc.data();
    const memberRefs = family.members;

    const membersCollectionRef = collection(projFirestore, "members");
    const memberDocsPromises = memberRefs.map(async (member) => {
      const memberQuery = query(membersCollectionRef, where(documentId(), "==", member));
      const memberQuerySnap = await getDocs(memberQuery);
      return memberQuerySnap.docs.map((memberDoc) => ({...memberDoc.data(), id: memberDoc.id}));
    });

    const memberDocsArrays = await Promise.all(memberDocsPromises);
    const memberDocs = memberDocsArrays.reduce((acc, val) => acc.concat(val), []);
    return memberDocs;
  }
}

export default familyFetcher;