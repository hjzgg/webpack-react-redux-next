import React from 'react';
import ButtonClick from 'components/ButtonClick';
//首页
export class Demo extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <ButtonClick/>
      </div>
    );
  }
}
module.exports = Demo;
