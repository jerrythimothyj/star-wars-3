import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class SpecieGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: this.props.species,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      species: nextProps.species,
    });
  }

  render() {
    const { species } = this.state;
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
              <th />
            </tr>
          </thead>
          <tbody>
            { species.map(specie => (<tr key={specie.name}>
              <td>{specie.name}</td>
              <td>{specie.classification}</td>
              <td>{specie.designation}</td>
              <td className="text-right">{specie.average_height}</td>
              <td>{specie.skin_colors}</td>
              <td>{specie.hair_colors}</td>
              <td>{specie.eye_colors}</td>
              <td className="text-right">{specie.average_lifespan}</td>
              <td>{specie.language}</td>
              <td className="text-center">
                {(specie.classification === 'amphibian' || specie.classification === 'rascakacahrhahrawh') && <img src="./images/amphibian.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'artificial' || specie.classification === 'rarcaoahwwahoaahraan') && <img src="./images/artificial.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'gastropod' || specie.classification === 'rrracaorcooakoowa') && <img src="./images/gastropod.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'insectoid' || specie.classification === 'ahwhcwooaaoooahwa') && <img src="./images/insectoid.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'mammal' || specie.classification === 'scrascscraan') && <img src="./images/mammal.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'mammals' || specie.classification === 'scrascscraanc') && <img src="./images/mammals.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'reptile' || specie.classification === 'rcwoakaoahanwo') && <img src="./images/reptile.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'reptilian' || specie.classification === 'rcwoakaoahanahrawh') && <img src="./images/reptilian.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'sentient' || specie.classification === 'cwowhaoahwowhao') && <img src="./images/sentient.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
                || (specie.classification === 'unknown' || specie.classification === 'huwhorwhooohwh') && <img src="./images/unknown.png" alt="" style={{ maxHeight: `${specie.average_height}px`, maxWidth: '100px' }} />
              }
              </td>
                                     </tr>)) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  species: state.specie.species,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // logout
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpecieGrid);
