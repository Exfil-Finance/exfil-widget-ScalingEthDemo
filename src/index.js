import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Button, Modal, Input, InputNumber, Menu, Dropdown, message } from 'antd';
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
        type="primary"
        shape="round"
        icon={<ToTopOutlined />}
        onClick={showModal}
      >
        Exfil Now
      </Button>

      <Modal
        title="Exfil instant withdrawal back to L1"
        visible={isModalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
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

        <p className="recipient-label"> Recipient: </p>
        <Input placeholder="myetherwallet.eth" />

        <p className="fee-label" hidden={!isTokenSelected}>
          Instant withdrawal fee: <strong>{tokenValue * feePercentage} {tokenText}</strong>
        </p>

        <p className="fee-label" hidden={!isTokenSelected}>
          You receive:
        </p>

      </Modal>
    </>
  );
};

ReactDOM.render(<App />, WidgetDiv);
