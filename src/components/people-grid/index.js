import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class PeopleGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peoples: this.props.peoples,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      peoples: nextProps.peoples,
    });
  }

  render() {
    const { peoples } = this.state;
    return (
      <div className="table-responsive planet-grid">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair Color</th>
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
                <td>{people.hair_color}</td>
                <td>{people.skin_color}</td>
                <td>{people.eye_color}</td>
                <td>{people.birth_year}</td>
                <td>{people.gender}</td>
                <td className="text-center">{
                        (people.gender === 'male' || people.gender === 'scraanwo') && <img src="./images/male.png" alt="" style={{ maxWidth: `${people.mass}px`, maxHeight: `${people.height}px` }} />
                        ||
                        (people.gender === 'female' || people.gender === 'wwwoscraanwo') && <img src="./images/female.png" alt=""style={{ maxWidth: `${people.mass}px`, maxHeight: `${people.height}px` }} />
                        ||
                        (people.gender === 'n/a' || people.gender === 'wh/ra') && <img src="./images/c3po.png" alt="" style={{ maxWidth: `${people.mass}px`, maxHeight: `${people.height}px` }} />}
                </td>
              </tr>)) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  peoples: state.people.peoples,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // logout
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleGrid);
