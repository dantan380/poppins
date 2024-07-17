import { useState } from "react"
import familyProfile from "../utils/dataFetcher/familyProfile"

const FamilyProfileForm = () => {
  const [familyName, setFamilyName] = useState('');
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const family = { familyName, members: [...parents, ...children] };
      const familyId = await familyProfile.createProfile(family);
      console.log('Family profile created with ID:', familyId);
    } catch (error) {
      console.error('Error creating family profile: ', error);
    }
  };

  const handleParentChange = (index, field, value) => {
    const newParents = [...parents];
    newParents[index] = { ...newParents[index], [field]: value };
    setParents(newParents);
  };


  const handleChildChange = (index, field, value) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setChildren(newChildren);
  };

  const addParent = () => {
    setParents([...parents, {
      birthdate: '', 
      category: 'Parent', 
      email: '', 
      firstName: '', 
      lastName: '', 
      notes: '', 
      phone: '' 
    }])
  };

  const addChild = () => {
    setChildren([...children, {
      birthdate: '', 
      category: 'Child', 
      email: '', 
      firstName: '', 
      lastName: '', 
      notes: '', 
      phone: '' 
    }])
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Family Profile</h2>

        <div>
          <label>Family Name:</label>
          <input
            type="text"
            id="familyName"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
        </div>

        <h3>Parents (Total: {parents.length})</h3>
        {parents.map((parent, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="First Name"
              value={parent.firstName}
              onChange={(e) => handleParentChange(index, 'firstName', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={parent.lastName}
              onChange={(e) => handleParentChange(index, 'lastName', e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={parent.email}
              onChange={(e) => handleParentChange(index, 'email', e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={parent.phone}
              onChange={(e) => handleParentChange(index, 'phone', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addParent}>Add Parent</button>

        <h3>Children (Total: {children.length})</h3>
        {children.map((child, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="First Name"
              value={child.firstName}
              onChange={(e) => handleChildChange(index, 'firstName', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={child.lastName}
              onChange={(e) => handleChildChange(index, 'lastName', e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Birthdate"
              value={child.birthdate}
              onChange={(e) => handleChildChange(index, 'birthdate', e.target.value)}
              required
            />
            <textarea
              placeholder="Notes (e.g., dietary restrictions)"
              value={child.notes}
              onChange={(e) => handleChildChange(index, 'notes', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addChild}>Add Child</button>

        <button type="submit">Create Family Profile</button>
      </form>
    </div>
  );
};

export default FamilyProfileForm
