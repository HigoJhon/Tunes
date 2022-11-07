import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    arrayMusic: [],
    nameAr: '',
    albumAr: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await musicsAPI(id);

    this.setState({
      arrayMusic: data,
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
          arrayMusic.map((music, index) => (
            index > 0
            && <MusicCard
              key={ music.artisId }
              artistName={ music.artistName }
              collectionName={ music.collectionName }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
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
