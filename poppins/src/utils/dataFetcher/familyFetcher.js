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
  },

  getCheckedIn: async (kidsCheckedIn) => {
    //Ideally, get checkedIn docs that were created upon checking in kids.
    //checkedIn docs would kids' name, time they were checked in, and possibly checkout time.
    //const checkedInCollectionRef = collection(projFirestore, "checked-in");
    //const checkedInQuery = query(checkedInCollectionRef, where("createdAt", "==", "today's date"));
    //return checkedInQuery;
    const kidsCollectionRef = collection(projFirestore, "kids");
    const kidsDocsPromises = kidsCheckedIn.map(async (checkedIn) => {
      const kidQuery = query(kidsCollectionRef, where(documentId(), "==", checkedIn.id));
      const kidQuerySnap = await getDocs(kidQuery);
      return kidQuerySnap.docs.map((kidDoc) => ({...kidDoc.data(), id: kidDoc.id}));
    });

    const kidDocsArray = await Promise.all(kidsDocsPromises);
    const kidDocs = kidDocsArray.reduce((acc, val) => acc.concat(val), []);
    return kidDocs;
  }
}

export default familyFetcher;