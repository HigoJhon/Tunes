import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
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
    const min = 3;
    this.setState({
      buttonDisabled: name.length < min,
    });
  };

  render() {
    const { buttonDisabled, name, loading } = this.state;
    return (
      <>
        <div data-testid="page-login">page-login</div>
        {
          loading ? <Loading /> : (
            <form>
              <input
                type="text"
                data-testid="login-name-input"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <br />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.click }
              >
                Entrar
              </button>
            </form>
          )
        }
      </>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
