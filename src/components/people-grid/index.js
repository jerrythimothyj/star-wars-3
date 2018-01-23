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
                            <th>Height</th>
                            <th>Mass</th>
                            <th>Hair Color</th>
                            <th>Skin Color</th>
                            <th>Eye Color</th>
                            <th>Birth Year</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                    { peoples.map((people) => {
                        return (<tr key={people.name}>
                            <td>{people.name}</td>
                            <td>{people.height}</td>
                            <td>{people.mass}</td>
                            <td>{people.hair_color}</td>
                            <td>{people.skin_color}</td>
                            <td>{people.eye_color}</td>
                            <td>{people.birth_year}</td>
                            <td>{people.gender}</td>
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