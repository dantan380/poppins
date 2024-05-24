/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CheckInPage = ({ families, error, loading }) => {

  return (
  <div>
    {error && <p>{error}</p>}
    {loading && <div>Loading...</div>}
    {families && families.length > 0 && (
      <ul>
        {families.map((family) => (
          <li key={family.id}>
            <Link to={`/family/${family.id}`}>
              {family.familyName} ({family.id})
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default CheckInPage;