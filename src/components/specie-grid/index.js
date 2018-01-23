import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

export class SpecieGrid extends Component {
    constructor(props) {
      super(props);

      this.state = {
          species: this.props.species
      }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            species: nextProps.species
        })
    }

    render() {
        let { species } = this.state;
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Classification</th>
                            <th>Designation</th>
                            <th>Average Height</th>
                            <th>Skin Colors</th>
                            <th>Hair Colors</th>
                            <th>Eye Colors</th>
                            <th>Average Lifespan</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                    { species.map((specie) => {
                        return (<tr key={specie.name}>
                            <th>{specie.name}</th>
                            <th>{specie.classification}</th>
                            <th>{specie.designation}</th>
                            <th>{specie.average_height}</th>
                            <th>{specie.skin_colors}</th>
                            <th>{specie.hair_colors}</th>
                            <th>{specie.eye_colors}</th>
                            <th>{specie.average_lifespan}</th>
                            <th>{specie.language}</th>
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
        species: state.specie.species
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    // logout
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpecieGrid)