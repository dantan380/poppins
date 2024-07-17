import { projFirestore } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const familyProfile = {

  createProfile: async (family) => {
    try {
      const familiesCollectionRef = collection(projFirestore, 'families');
      const membersCollectionRef = collection(projFirestore, 'members');

      const memberIds = [];

      for (const member of family.members) {
        const memberDocRef = await addDoc(membersCollectionRef, {
          birthdate: member.birthdate,
          category: member.category,
          email: member.email,
          phone: member.phone,
          firstName: member.firstName,
          lastName: member.lastName,
          notes: member.notes
        });
        memberIds.push(memberDocRef.id);
      }

      const familyDocRef = await addDoc(familiesCollectionRef, {
        familyName: family.familyName,
        members: memberIds
      });

      return familyDocRef.id;
    } catch (error) {
      console.error("Error adding family profile: ", error);
      throw error;
    }
  }
};

export default familyProfile;