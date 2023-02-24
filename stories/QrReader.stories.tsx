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

const Template: Story<QrCodeScannerProps> = (args) => {
  const [data, setData] = useState('No result');
  const [error, setError] = useState('');

  return (
    <div style={styles.container}>
      <QrCodeScanner
        {...args}
        onResult={(result, error) => {
          if (result) {
            setData(result.getText());
          } else if (error) {
            setError(error.message);
          }
        }}
        onLoad={() => console.info('Video feed has loaded!')}
      />
      <p>The value is: {JSON.stringify(data, null, 2)}</p>
      <p>The error is: {error}</p>
    </div>
  );
};

export const ScanCode = Template.bind({});

ScanCode.args = {
  ViewFinder,
  videoId: 'video',
  scanDelay: 500,
  constraints: {
    facingMode: 'user',
  },
};

export default {
  title: 'Browser QR Reader',
  component: QrCodeScanner,
};
