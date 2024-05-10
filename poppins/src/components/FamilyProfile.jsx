import useFirestore from "../../hooks/useFirestore";

const FamilyProfile = () => {
  const { kidsDocs, parentsDocs } = useFirestore();
  console.log(kidsDocs, parentsDocs);

  return (
    <div>
      <div>Family</div>
      <h2>Kids</h2>
      <ul>
        {kidsDocs && kidsDocs.map((kid) => {
          return <li key={kid.id}>{kid.notes}</li>
        })}
      </ul>
    </div>
  )
};

export default FamilyProfile;