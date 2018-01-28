import React from 'react';
import { removeCommas } from '../../services';

function PeopleGrid(props) {
  const { peoples } = props;
  return (
    <div className="table-responsive planet-grid">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Skin Color</th>
            <th>Eye Color</th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { peoples.map(people => (
            <tr key={people.name}>
              <td>{people.name}</td>
              <td className="text-right">{people.height}</td>
              <td className="text-right">{people.mass}</td>
              <td>{people.skin_color}</td>
              <td>{people.eye_color}</td>
              <td>{people.birth_year}</td>
              <td>{people.gender}</td>
              <td className="text-center">{
                        ((people.gender === 'male' || people.gender === 'scraanwo') && <img src="./images/male.png" alt="" style={{ maxWidth: `${removeCommas(people.mass)}px`, maxHeight: `${people.height}px` }} />
                      ) || (
                        (people.gender === 'female' || people.gender === 'wwwoscraanwo') && <img src="./images/female.png" alt=""style={{ maxWidth: `${people.mass}px`, maxHeight: `${people.height}px` }} />
                      ) || (
                        (people.gender === 'hermaphrodite' || people.gender === 'acworcscraakacrcoowaahaowo') && <img src="./images/hermaphrodite.png" alt=""style={{ maxWidth: `${people.mass}px`, maxHeight: `${people.height}px` }} />
                      ) || (
                        (people.gender === 'n/a' || people.gender === 'none' || people.gender === 'wh/ra' || people.gender === 'whoowhwo') && <img src="./images/c3po.png" alt="" style={{ maxWidth: `${people.mass}px`, maxHeight: `${people.height}px` }} />
                    )}
              </td>
            </tr>)) }
        </tbody>
      </table>
    </div>
  );
}

export default PeopleGrid;
