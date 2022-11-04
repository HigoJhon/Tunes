import React from 'react';
import { Link } from 'react-router-dom';
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
            <>
              <p data-testid="header-user-name">
                {userName.name}
              </p>
              <Link data-testid="link-to-search" to="/search">search</Link>
              <br />
              <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
              <br />
              <Link data-testid="link-to-profile" to="/profile">profile</Link>
            </>

          )
        }

      </header>
    );
  }
}

export default Header;
