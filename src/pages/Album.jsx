import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    arrayMusic: [],
    nameAr: '',
    albumAr: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const track = data.filter((a) => a.trackName);
    this.setState({
      arrayMusic: track,
      nameAr: data[0].artistName,
      albumAr: data[0].collectionName,
    });
  }

  render() {
    const { arrayMusic, albumAr, nameAr } = this.state;
    return (
      <div data-testid="page-album">

        <Header />
        <h2 data-testid="artist-name">{ nameAr }</h2>
        <h2 data-testid="album-name">{ albumAr }</h2>
        {
          arrayMusic.map((music) => (
            <div key={ music.artisId }>
              <MusicCard
                key={ music.artisId }
                artistName={ music.artistName }
                collectionName={ music.collectionName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
