import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Select, Button } from 'antd';
import funkwhales from '../../assets/funkwhales.png';
import { setInstanceUrl } from '../../redux/features/currentSession';
import { RootReducer } from '../../redux/features/root';

const { Option } = Select;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #fff;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputWithLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const ConfirmButton = styled(Button)`
  margin-top: 2em;
`;

const Logo = styled.img`
  padding-bottom: 2em;
`;

function InitialView() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedProtocol, setSelectedProtocol] = useState('https://');
  const [selectedUrl, setSelectedUrl] = useState('');
  const [enteredUrl, setEnteredUrl] = useState('');
  const currentUrl = useSelector((state: RootReducer) => state.currentSession.url);

  useEffect(() => {
    if (currentUrl) history.push('/songs');
  }, [currentUrl]);

  const handleConfirm = (): void => {
    if (selectedUrl.length) dispatch(setInstanceUrl({ url: selectedUrl }));
    else if (enteredUrl.length) dispatch(setInstanceUrl({ url: selectedProtocol + enteredUrl }));
  };

  const handleSelectChange = (instanceUrl: string): void => {
    setSelectedUrl(instanceUrl);
    setEnteredUrl('');
  };

  const handleProtocolChange = (protocol: string): void => {
    setSelectedProtocol(protocol);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedUrl('');
    setEnteredUrl(event.currentTarget.value);
  };

  const selectBefore = (
    <Select defaultValue="https://" className="select-before" size="large" onChange={handleProtocolChange}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Container>
      <Logo src={funkwhales} />
      <div>
        <InputWithLabelContainer style={{ marginBottom: 16 }}>
          <Label>Enter a url of an instance you want to connect to</Label>
          <Input
            addonBefore={selectBefore}
            defaultValue=""
            style={{ width: '30em' }}
            value={enteredUrl}
            onChange={handleInputChange}
          />
        </InputWithLabelContainer>
        <InputWithLabelContainer>
          <Label> or select from a predefined list</Label>
          <Input.Group>
            <Select defaultValue="" style={{ width: '30em' }} onChange={handleSelectChange} value={selectedUrl}>
              <Option value="https://audio.liberta.vip">audio.liberta.vip</Option>
              <Option value="https://audio.gafamfree.party">audio.gafamfree.party</Option>
              <Option value="https://music.librepunk.club">music.librepunk.club</Option>
              <Option value="https://tanukitunes.com">tanukitunes.com</Option>
              <Option value="https://funkwhale.net">funkwhale.net</Option>
            </Select>
          </Input.Group>
        </InputWithLabelContainer>
      </div>
      <ConfirmButton type="primary" size="large" onClick={handleConfirm}>
        Go to the instance
      </ConfirmButton>
    </Container>
  );
}

export default InitialView;
