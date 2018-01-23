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
                            <th>{people.name}</th>
                            <th>{people.height}</th>
                            <th>{people.mass}</th>
                            <th>{people.hair_color}</th>
                            <th>{people.skin_color}</th>
                            <th>{people.eye_color}</th>
                            <th>{people.birth_year}</th>
                            <th>{people.gender}</th>
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