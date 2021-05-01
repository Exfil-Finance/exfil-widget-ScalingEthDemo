import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Button, Modal, Input, InputNumber, Menu, Dropdown, Divider, message } from 'antd';
import { ToTopOutlined, DownOutlined } from "@ant-design/icons";

const WidgetDiv = document.querySelector('.exfil_widget')

const App = () => {

  // State variables
  const feePercentage = 0.05;

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [isTokenSelected, setTokenSelected] = React.useState(false);

  const [tokenValue, setTokenValue] = React.useState(100);
  const [tokenText, setTokenText] = React.useState('Select token');

  // Modal
  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setModalVisible(false);
  };

  // InputNumber
  const handleInputNumberChange = (value) => {
    console.log('changed', value);
    setTokenValue(value);
  }

  // Dropdown Token Menu
  const onClickTokenDropdown = ({ key }) => {
    message.info(`Selected ${key}`);
    setTokenText(`${key}`);
    setTokenSelected(true);
  };

  const tokenDropdownMenu = (
    <Menu onClick={onClickTokenDropdown}>
      <Menu.Item key="WETH">WETH</Menu.Item>
      <Menu.Item key="DAI">DAI</Menu.Item>
      <Menu.Item key="SNX">SNX</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Button
        id="exfil-btn"
        type="primary"
        shape="round"
        icon={<ToTopOutlined />}
        onClick={showModal}
      >
        Exfil Now
      </Button>

      <Modal
        title="Confirm instant withdrawal back to L1"
        visible={isModalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p className="input-label"> Token to withdraw: </p>
        <InputNumber
          style={{
            width: 100,
          }}
          defaultValue="100"
          min="0.01"
          max="1000000"
          step="1"
          onChange={handleInputNumberChange}
          stringMode
        />

        <Dropdown overlay={tokenDropdownMenu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {tokenText} <DownOutlined />
          </a>
        </Dropdown>

        <p className="input-label"> Recipient: </p>
        <Input placeholder="myetherwallet.eth" />

        <div className="fee-section" hidden={!isTokenSelected}>
          <Divider />
          <p>
            Instant withdrawal fee: <strong>{(tokenValue * feePercentage).toFixed(2)} {tokenText}</strong>
          </p>

          <p>
            You receive: <strong>{(tokenValue - (tokenValue * feePercentage)).toFixed(2)} {tokenText}</strong>
          </p>
        </div>

      </Modal>
    </>
  );
};

ReactDOM.render(<App />, WidgetDiv);
