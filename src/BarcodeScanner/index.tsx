import {useState, useMemo, useRef, useEffect, ReactEventHandler} from 'react';
import {BrowserMultiFormatReader} from '@zxing/browser';
import {FiCameraOff} from 'react-icons/fi';
import {BarcodeScannerProps as Props} from '../types';
import {decodeBarcodeFromConstraints} from './utils';
import {styles} from './styles';

const BarcodeScanner = ({
  doScan = true,
  constraints = {facingMode: 'environment'},
  onSuccess,
  onError,
  onLoad,
  Viewfinder,
  containerStyle,
  videoContainerStyle,
  videoStyle,
}: Props) => {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);
  const videoElement = useRef<HTMLVideoElement>(null);
  const isShowingDisabledImage = !isCameraInitialized || !doScan;

  useEffect(() => {
    if (!doScan || !onSuccess || !onError) {
      return;
    }

    if (!navigator?.mediaDevices) {
      const message =
        'Your browser has no support for the MediaDevices API. You could fix this by running "npm i webrtc-adapter"';

      console.warn(`[ReactBarcodeScanner]: ${message}`);
      onError(new Error(message));
      return;
    }

    decodeBarcodeFromConstraints(codeReader, videoElement, {
      constraints,
      onSuccess,
      onError,
    });
  }, [onSuccess, onError, doScan, codeReader, constraints]);

  const onLoadedData: ReactEventHandler<HTMLVideoElement> = ({nativeEvent}) => {
    const eventTarget = nativeEvent.target as HTMLVideoElement | null;

    if (!eventTarget?.readyState) return;

    if (eventTarget.readyState === eventTarget.HAVE_ENOUGH_DATA) {
      setIsCameraInitialized(true);

      if (onLoad) {
        onLoad();
      }
    }
  };

  return (
    <section style={containerStyle}>
      {isShowingDisabledImage && (
        <div style={styles.barcodeScannerError}>
          <FiCameraOff size={300} style={styles.barcodeScannerErrorSvg} />
        </div>
      )}
      <div
        style={{
          ...styles.container,
          ...(!isShowingDisabledImage ? styles.barcodeScannerVisible : {}),
          ...videoContainerStyle,
        }}>
        <video
          ref={videoElement}
          playsInline
          disablePictureInPicture
          muted
          onLoadedData={onLoadedData}
          style={{
            ...styles.video,
            ...videoStyle,
            transform: `${videoStyle?.transform ?? ''} ${
              constraints.facingMode === 'user' ? 'scaleX(-1)' : ''
            }`,
          }}
        />
        {!!Viewfinder && <Viewfinder />}
      </div>
    </section>
  );
};

BarcodeScanner.displayName = 'BarcodeScanner';

export default BarcodeScanner;
