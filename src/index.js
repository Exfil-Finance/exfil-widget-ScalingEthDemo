import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { ToTopOutlined } from "@ant-design/icons";

const WidgetDiv = document.querySelector('.exfil_widget')

class App extends React.Component {
  state = {
    isLoading: false
  };

  setLoading() {
    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 6000);
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
      <Button
        type="primary"
        icon={<ToTopOutlined />}
        loading={isLoading}
        onClick={() => this.setLoading()}
      >
        Exfil Now
      </Button>
      </>
    );
  }
}

ReactDOM.render(<App />, WidgetDiv);
