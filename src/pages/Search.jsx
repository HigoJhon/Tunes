import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    name: '',
    buttonDisabled: true,
    loading: false,
  };

  click = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
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
    const { buttonDisabled, name, loading } = this.state;
    return (
      <div data-testid="page-search">
        {
          loading ? <Loading /> : (
            <>
              <Header />
              <input
                type="text"
                data-testid="search-artist-input"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <br />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.click }
              >
                Pesquisar
              </button>
            </>
          )
        }

      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Search;
