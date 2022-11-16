import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { isSave } = props;
    this.state = {
      loading: false,
      ischecked: isSave,
    };
  }

  checkMusic = () => {
    this.setState({
      ischecked: true,
      loading: true,
    }, async () => {
      await addSong(this.props);
      this.setState({ ischecked: true, loading: false });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, ischecked } = this.state;
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
                  checked={ ischecked }
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
  trackId: PropTypes.number.isRequired,
  isSave: PropTypes.bool.isRequired,
};

export default MusicCard;
