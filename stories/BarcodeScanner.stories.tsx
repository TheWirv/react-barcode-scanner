import {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Viewfinder} from './Viewfinder';
import {BarcodeScanner} from '../src';

export default {component: BarcodeScanner} as ComponentMeta<
  typeof BarcodeScanner
>;

const styles = {
  container: {
    width: '400px',
    margin: 'auto',
  },
};
const defaultData = 'No result';
const defaultError = 'No error';

const Template: ComponentStory<typeof BarcodeScanner> = (args) => {
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
        <BarcodeScanner
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
  Viewfinder,
  videoId: 'video',
  constraints: {facingMode: 'user'},
};
