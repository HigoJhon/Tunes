import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    music: false,
  };

  checkMusic = () => {
    const { trackId } = this.props;
    this.setState({
      music: true,
      loading: true,
    }, async () => {
      const indexMusic = await getMusics(trackId);
      await addSong(indexMusic);
      this.setState({ music: true, loading: false });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, music } = this.state;
    return (
      <div>
        {
          loading ? <Loading loading={ loading } /> : (
            <>
              <h2>{trackName}</h2>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="check">
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  id="check"
                  name="check"
                  checked={ music }
                  onChange={ this.checkMusic }
                />
                Favorita
              </label>
            </>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
