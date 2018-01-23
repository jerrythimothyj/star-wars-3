import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

export class PeopleGrid extends Component {
    constructor(props) {
      super(props);

      this.state = {
          peoples: this.props.peoples
      }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            peoples: nextProps.peoples
        })
    }

    render() {
        let { peoples } = this.state;
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
                        </tr>
                    </thead>
                    <tbody>
                    { peoples.map((people) => {
                        return (<tr key={people.name}>
                            <th>{people.name}</th>
                            <th>{people.rotation_period}</th>
                            <th>{people.orbital_period}</th>
                            <th>{people.diameter}</th>
                            <th>{people.climate}</th>
                            <th>{people.gravity}</th>
                            <th>{people.terrain}</th>
                            <th>{people.surface_water}</th>
                            <th>{people.population}</th>
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
        peoples: state.people.peoples
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    // logout
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleGrid)