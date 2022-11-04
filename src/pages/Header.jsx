import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    userName: '',
  };

  async componentDidMount() {
    const name = await getUser();
    this.setState({
      userName: name,
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { userName }
        </p>
      </header>
    );
  }
}

export default Header;
