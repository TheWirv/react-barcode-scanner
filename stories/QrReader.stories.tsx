import {useState} from 'react';
import {Story} from '@storybook/react';

import {ViewFinder} from './ViewFinder';

import {QrCodeScanner, QrCodeScannerProps} from '../lib/module';

const styles = {
  container: {
    width: '400px',
    margin: 'auto',
  },
};
const defaultData = 'No result';
const defaultError = 'No error';

const Template: Story<QrCodeScannerProps> = (args) => {
  const [renderCamera, setRenderCamera] = useState(true);
  const [doScan, setDoScan] = useState(true);
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(defaultError);

  const onClickReset = () => {
    setData(defaultData);
    setError(defaultError);
    setRenderCamera(true);
    setDoScan(true);
  };

  return (
    <div style={styles.container}>
      {renderCamera ? (
        <QrCodeScanner
          {...args}
          doScan={doScan}
          onSuccess={(text) => {
            setData(text);
            setDoScan(false);
            setRenderCamera(false);
          }}
          onError={(error) => {
            if (error) {
              setError(error.message);
            }
          }}
        />
      ) : (
        <button onClick={onClickReset}>Reset Scanner</button>
      )}
      <p>The value is: {data}</p>
      <p>The error is: {error}</p>
    </div>
  );
};

export const ScanCode = Template.bind({});

ScanCode.args = {
  ViewFinder,
  videoId: 'video',
  constraints: {
    facingMode: 'user',
  },
};

export default {
  title: 'Browser QR Reader',
  component: QrCodeScanner,
};
