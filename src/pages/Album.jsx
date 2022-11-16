import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    arrayMusic: [],
    nameAr: '',
    albumAr: '',
    savedMusic: [],
  };

  async componentDidMount() {
    const savedMusic = await getFavoriteSongs();
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const track = data.filter((a) => a.trackName);
    this.setState({
      arrayMusic: track,
      nameAr: data[0].artistName,
      albumAr: data[0].collectionName,
      savedMusic,
    });
  }

  render() {
    const { arrayMusic, albumAr, nameAr, savedMusic } = this.state;
    return (
      <div data-testid="page-album">

        <Header />
        <h2 data-testid="artist-name">{ nameAr }</h2>
        <h2 data-testid="album-name">{ albumAr }</h2>
        {
          arrayMusic.map((music) => {
            const isSave = savedMusic.some((a) => a.trackId === music.trackId);
            return (<MusicCard
              key={ music.trackId }
              {
                ...music
              }
              isSave={ isSave }
            />
            );
          })
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
