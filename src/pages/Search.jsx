import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    name: '',
    albumName: [],
    buttonDisabled: true,
    loading: false,
    artist: '',
  };

  click = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    const nameAlbum = await searchAlbumsAPIs(name);
    this.setState({
      artist: name,
      name: '',
      loading: false,
      albumName: nameAlbum,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), () => {
      this.validacao();
    });
  };

  validacao = () => {
    const { name } = this.state;
    const min = 2;
    this.setState({
      buttonDisabled: name.length < min,
    });
  };

  render() {
    const { buttonDisabled, name, loading, albumName, artist } = this.state;
    return (
      <div data-testid="page-search">

        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <br />
        {
          loading ? <Loading /> : (

            <>
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.click }
              >
                Pesquisar
              </button>
              <br />
            </>
          )
        }
        {
          (albumName.length > 0) && (
            <p>
              Resultado de álbuns de:
              {' '}
              { artist }
            </p>
          )
        }
        {
          (albumName.length === 0) && (<p> Nenhum álbum foi encontrado </p>)
        }
        {
          albumName.map((a) => (
            <ul key={ a.collectionId }>
              <img src={ a.artworkUrl100 } alt={ a.collectionName } />
              <li>{ a.artistName }</li>
              <li>{ a.collectionName }</li>
              <Link
                data-testid={ `link-to-album-${a.collectionId}` }
                to={ `/album/${a.collectionId}` }
              >
                Musicas
              </Link>
            </ul>
          ))
        }
      </div>
    );
  }
}

export default Search;
