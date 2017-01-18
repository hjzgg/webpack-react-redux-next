import React from 'react';
import Page from 'components/Page';
//首页
export class Extend extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <Page />
      </div>
    );
  }
}
module.exports = Extend;
