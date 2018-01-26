import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './index.css';

export class PlanetGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: this.props.planets,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      planets: nextProps.planets,
    });
  }

  render() {
    const { planets } = this.state;
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { planets.map(planet => (<tr key={planet.name}>
              <td>{planet.name}</td>
              <td className="text-right">{planet.rotation_period}</td>
              <td className="text-right">{planet.orbital_period}</td>
              <td className="text-right">{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td className="text-right">{planet.surface_water}</td>
              <td className="text-right">
                {planet.population}
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${planet.population / (planet.diameter * 5000)}%` }} />
                </div>
              </td>
              <td className="text-center">
                <div
                  className="planet-diameter bg-success"
                  style={{
 width: `${planet.diameter / 500}px`, height: `${planet.diameter / 500}px`, borderRadius: '50%', animationDuration: `${planet.rotation_period}s`,
}}
                />
              </td>
                                     </tr>)) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  planets: state.planet.planets,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // logout
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanetGrid);
