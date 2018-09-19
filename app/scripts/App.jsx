import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="content">
        { children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
