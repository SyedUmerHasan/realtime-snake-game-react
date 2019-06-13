import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Sider from './component/Sider';
import PageLayout from './component/PageLayout';

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    this.setState({ date });
  };

  render() {
      const { date } = this.state;
      // <Sider/>
    return (
        <div>
        <PageLayout/>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));