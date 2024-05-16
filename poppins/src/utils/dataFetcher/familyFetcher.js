import { projFirestore } from "../../../firebase/config";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";

const familyFetcher = {

  /*
    Fetch all the member documents for a given family name
  */
  getFamilyMembers: async (queryInput) => {
    const familiesCollectionRef = collection(projFirestore, "families");
    const familyQuery = query(familiesCollectionRef, where("familyName", "==", queryInput.familyName));

    let familiesDocuments = [];

    const querySnapshot = await getDocs(familyQuery);
    querySnapshot.forEach((familyDoc) => {
      familiesDocuments.push({...familyDoc.data(), id: familyDoc.id})
    });
    
    const family = familiesDocuments[0]
    const memberRefs = family.members

    // const memberDocs = [];
    const membersCollectionRef = collection(projFirestore, "members");
    
    const memberDocsPromises = memberRefs.map(async(member) => {
      const memberQuery = query(membersCollectionRef, where(documentId(), "==", member));
      const memberQuerySnap = await getDocs(memberQuery);
      // return memberQuerySnap.docs.forEach((memberDoc) => {
      //   memberDocs.push({...memberDoc.data(), id: memberDoc.id})
      // })
      return memberQuerySnap.docs.map((memberDoc) => ({ ...memberDoc.data(), id: memberDoc.id }))
    });

    const memberDocsArrays = await Promise.all(memberDocsPromises);
    const memberDocs = memberDocsArrays.reduce((acc, val) => acc.concat(val), []);
    console.log(memberDocs)
    return memberDocs;
  }
}

export default familyFetcher