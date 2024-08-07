import { projFirestore } from "../../../firebase/config";
import { collection, query, where, getDocs, documentId, doc, getDoc, serverTimestamp, setDoc, orderBy, limit, deleteDoc } from "firebase/firestore";

const familyFetcher = {

  getMembers: async (memberIds) => {
    const membersCollectionRef = collection(projFirestore, "members");
    const memberDocsPromises = memberIds.map(async (member) => {
      const memberDoc = await getDoc(doc(membersCollectionRef, member.id));
      if (memberDoc.exists()) {
        return { ...memberDoc.data(), id: memberDoc.id };
      }
      return null;
    });

    const memberDocs = await Promise.all(memberDocsPromises);
    return memberDocs.filter(doc => doc !== null);
  },
  getFamilies: async (queryInput) => {
    const familiesCollectionRef = collection(projFirestore, "families");

    const searchTerm = queryInput.familyName.toLowerCase();

    const familyQuery = query(
      familiesCollectionRef,
      orderBy("familyName"),
      limit(100)
    );

    let familiesDocuments = [];

    const querySnapshot = await getDocs(familyQuery);
    querySnapshot.forEach((familyDoc) => {
      const familyData = familyDoc.data();
      if (familyData.familyName.toLowerCase().startsWith(searchTerm)) {
        familiesDocuments.push({...familyData, id: familyDoc.id});
      }
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

  getCheckedIn: async () => {
    //Ideally, get checkedIn docs that were created upon checking in kids.
    //checkedIn docs would kids' name, time they were checked in, and possibly checkout time.
    //const checkedInCollectionRef = collection(projFirestore, "checked-in");
    //const checkedInQuery = query(checkedInCollectionRef, where("createdAt", "==", "today's date"));
    //return checkedInQuery;
    const checkedInCollectionRef = collection(projFirestore, "checked-in");
    
    try {
      const recentDateQuery = query(checkedInCollectionRef, orderBy('date', 'desc'), limit(1));
      const recentDateSnap = await getDocs(recentDateQuery);

      if (recentDateSnap.empty) {
        console.log('No check-ins found');
        return { success: true, checkedInChildren: [], date: null };
      }

      const recentDateDoc = recentDateSnap.docs[0];
      const recentDate = recentDateDoc.id;

      const childrenCollectionRef = collection(recentDateDoc.ref, 'children');

      const childrenQuery = query(childrenCollectionRef);
      const childrenSnap = await getDocs(childrenQuery);

      const checkedInChildrenIds = childrenSnap.docs.map(doc => doc.id);

      const mainChildrenCollectionRef = collection(projFirestore, 'members');
      const checkedInDocsPromises = checkedInChildrenIds.map(async (checkedInChildId) => {
        const mainChildQuery = query(mainChildrenCollectionRef, where(documentId(), "==", checkedInChildId));
        const mainChildSnap = await getDocs(mainChildQuery);
        return mainChildSnap.docs.map((childDoc) => ({...childDoc.data(), id: childDoc.id}));
      });

      const checkedInChildrenDocsArray = await Promise.all(checkedInDocsPromises);
      const checkedInChildrenDocs = checkedInChildrenDocsArray.reduce((acc, val) => acc.concat(val), []);

      console.log(`Retrieved ${checkedInChildrenDocs.length} checked-in children for ${recentDate}`);
      return { success: true, checkedInChildrenDocs, date: recentDate };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  },

  getCheckedInWithDate: async (date) => {
    const checkedInCollectionRef = collection(projFirestore, "checked-in");

    try {
      const checkedInDateQuery = query(checkedInCollectionRef, where(documentId(), "==", date));
      const checkedInDateQuerySnap = await getDocs(checkedInDateQuery);

      if (checkedInDateQuerySnap.empty) {
        console.log('No check-ins found');
        return { success: true, checkedInChildren: [], date: null };
      }

      const checkedInDateDoc = checkedInDateQuerySnap.docs[0];
      const checkedInDate = checkedInDateDoc.id;

      const childrenCollectionRef = collection(checkedInDateDoc.ref, 'children');

      const childrenQuery = query(childrenCollectionRef);
      const childrenSnap = await getDocs(childrenQuery);

      const checkedInChildrenIds = childrenSnap.docs.map(doc => doc.id);

      const mainChildrenCollectionRef = collection(projFirestore, 'members');
      const checkedInDocsPromises = checkedInChildrenIds.map(async (checkedInChildId) => {
        const mainChildQuery = query(mainChildrenCollectionRef, where(documentId(), "==", checkedInChildId));
        const mainChildSnap = await getDocs(mainChildQuery);
        return mainChildSnap.docs.map((childDoc) => ({...childDoc.data(), id: childDoc.id}));
      });

      const checkedInChildrenDocsArray = await Promise.all(checkedInDocsPromises);
      const checkedInChildrenDocs = checkedInChildrenDocsArray.reduce((acc, val) => acc.concat(val), []);

      console.log(`Retrieved ${checkedInChildrenDocs.length} checked-in children for ${checkedInDate}`);
      return { success: true, checkedInChildrenDocs, date: checkedInDate };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  },

  checkInChildren: async (childrenToCheckIn) => {
    const today = new Date().toISOString().split('T')[0];

    const checkedInRef = collection(projFirestore, "checked-in");
    const todayDocRef = doc(checkedInRef, today);
    const childrenSubCollectionRef = collection(todayDocRef, 'children');
    const checkedInChildren = [];

    try {
      await setDoc(todayDocRef, { date: today }, { merge: true });

      for (const child of childrenToCheckIn) {
        const childDocRef = doc(childrenSubCollectionRef, child.id);
        await setDoc(childDocRef, {
          childId: child.id,
          timestamp: serverTimestamp()
        }, {merge: true });
        checkedInChildren.push(child.id);
      }

      console.log(`Check-in completed for ${checkedInChildren.length} children on ${today}`);
      return { success: true, checkedInChildren, date: today };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  },

  undoCheckIn: async (childrenToUncheck) => {
    const today = new Date().toISOString().split('T')[0];

    const checkedInRef = collection(projFirestore, "checked-in");
    const todayDocRef = doc(checkedInRef, today);
    const childrenSubCollectionRef = collection(todayDocRef, 'children');

    const undoneChildren = [];

    try {
      for (const child of childrenToUncheck) {
        const childDocRef = doc(childrenSubCollectionRef, child.id);

        const childDoc = await getDoc(childDocRef);

        if (childDoc.exists()) {
          await deleteDoc(childDocRef);
          undoneChildren.push(child.id);
          console.log(`Undid check-in for child with ID ${child.id} on ${today}`);
        } else {
          console.log(`Child with ID: ${child.id} was not checked in today.`);
        }
      }

      if (undoneChildren.length > 0) {
        return {
          success: true,
          undoneChildrenIds: undoneChildren,
          date: today,
          message: `Undid check-in for ${undoneChildren.length} child(ren) on ${today}`
        };
      } else {
        return {
          success: false,
          message: "No specified children were checked in today to undo."
        };
      }
      
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }
};

export default familyFetcher;