import {useState, useRef, useMemo, useEffect, memo} from 'react';
import {BarcodeScanner as ReactBarcodeScanner} from '@thewirv/react-barcode-scanner';
import Viewfinder from './Viewfinder';
import {useComponentDimensions} from './useComponentDimensions';

interface Props {
  description?: string | JSX.Element;
  onScan: (data: string) => void;
  onError?: () => void;
}

function BarcodeScanner({description, onScan, onError}: Props) {
  const [doScan, setDoScan] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const {width: containerWidth} = useComponentDimensions(containerRef);

  const videoStyle = useMemo(
    () => ({
      width: 500,
      height: 375,
      margin: '0 auto',
    }),
    []
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      setDoScan(false);
    };
  }, []);

  return (
    <>
      {description && <p>{description}</p>}
      <div ref={containerRef}>
        <ReactBarcodeScanner
          doScan={doScan}
          onSuccess={(text) => {
            setDoScan(false);
            onScan(text);
          }}
          onError={(error) => {
            if (!error) {
              return;
            }

            let errorMessage = '';

            if (error.name.includes('NotFoundError')) {
              errorMessage = 'Camera not found!';
            } else if (error.name.includes('IndexSizeError')) {
              errorMessage = 'Scanner error';
            }

            setDoScan(false);
            setError(errorMessage);
            onError && onError();
          }}
          videoContainerStyle={{...videoStyle, paddingTop: 0}}
          videoStyle={videoStyle}
          Viewfinder={() => (
            <Viewfinder
              containerWidth={containerWidth}
              containerHeight={videoStyle.height}
            />
          )}
        />
      </div>
      <button
        onMouseDown={() => setDoScan((prev) => !prev)}
        style={{marginTop: 12}}>
        Toggle
      </button>
    </>
  );
}

export default memo(BarcodeScanner);
