import React from 'react';

const propTypes = {
  children: React.PropTypes.element,
};

class ModuleRouters extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

ModuleRouters.propTypes = propTypes;

module.exports = ModuleRouters;