import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    loading: true,
  };

  async componentDidMount() {
    const name = await getUser();
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (
            <p data-testid="header-user-name">
              {userName.name }
            </p>
          )
        }

      </header>
    );
  }
}

export default Header;
