import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getValue } from '../../services/data/data.services';

export class PlanetGrid extends Component {
    constructor(props) {
      super(props);

    this.getValueByKey = (apiPath, key) => {
        return getValue(apiPath, key)
                .then(response => {
                    return response;
                })
                .then(response => {
                    return Promise.resolve(response)
                })
}

      this.state = {
          planets: this.props.planets
      }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            planets: nextProps.planets
        })
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
                            <th>Orbital_Period</th>
                            <th>Diameter</th>
                            <th>Climate</th>
                            <th>Gravity</th>
                            <th>Terrain</th>
                            <th>Surface Water</th>
                            <th>Population</th>
                            <th>Residents</th>
                            <th>Films</th>
                        </tr>
                    </thead>
                    <tbody>
                    { planets.map((planet) => {
                        return (<tr key={planet.name}>
                            <th>{planet.name}</th>
                            <th>{planet.rotation_period}</th>
                            <th>{planet.orbital_period}</th>
                            <th>{planet.diameter}</th>
                            <th>{planet.climate}</th>
                            <th>{planet.gravity}</th>
                            <th>{planet.terrain}</th>
                            <th>{planet.surface_water}</th>
                            <th>{planet.population}</th>
                            <th>
                                {planet.residents.map(resident => {
                                    return (
                                        <p key={resident}>
                                            {
                                                console.log(this.getValueByKey(resident, 'name'))
                                            }
                                        </p>
                                    )
                                })}
                            </th>
                            <th>
                                {planet.films.map(film => {
                                    return (
                                        <p key={film}>{film}</p>
                                    )
                                })}
                            </th>
                        </tr>)
                    }) }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        planets: state.planet.planets
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    // logout
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanetGrid)