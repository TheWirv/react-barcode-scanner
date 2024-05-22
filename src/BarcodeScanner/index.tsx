import {
  useState,
  useMemo,
  useRef,
  useEffect,
  ReactEventHandler,
} from 'react';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { FiCameraOff } from 'react-icons/fi';
import { BarcodeScannerProps as Props } from '../types';
import { decodeBarcodeFromConstraints } from './utils';
import { styles } from './styles';

const BarcodeScanner = ({
  doScan = true,
  constraints = { facingMode: 'user' },
  onSuccess,
  onError,
  onLoad,
  videoId = 'video',
  Viewfinder,
  containerStyle,
  videoContainerStyle,
  videoStyle,
}: Props) => {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);
  const hasUnmountedRef = useRef(false);
  const controlsArrayRef = useRef<IScannerControls[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cleanUpControls = () => {
    controlsArrayRef.current.forEach(({ stop }) => {
      stop();
    });
    controlsArrayRef.current = [];
  };

  useEffect(
    () => {
      return () => {
        cleanUpControls();
        hasUnmountedRef.current = true;
      }
    },
    []
  );

  useEffect(() => {
    const cleanup = () => {
      cleanUpControls();
    }

    if (!doScan || !isCameraInitialized) {
      cleanUpControls();
      return cleanup;
    }

    if (!onSuccess || !onError) {
      return cleanup
    }

    if (!navigator?.mediaDevices) {
      const message =
        'Your browser has no support for the MediaDevices API. You could fix this by running "npm i webrtc-adapter"';

      console.warn(`[ReactBarcodeScanner]: ${message}`);
      onError(new Error(message));
      return cleanup;
    }

    decodeBarcodeFromConstraints(
      controlsArrayRef,
      codeReader,
      hasUnmountedRef,
      {
        constraints,
        videoId,
        onSuccess,
        onError,
      }
    );

    return cleanup;
  }, [onSuccess, onError, doScan, codeReader, isCameraInitialized, constraints, videoId]);

  const onLoadedData: ReactEventHandler<HTMLVideoElement> = () => {
    if (videoRef.current) {
      const { readyState, HAVE_ENOUGH_DATA } = videoRef.current;

      if (readyState === HAVE_ENOUGH_DATA) {
        setIsCameraInitialized(true);

        if (onLoad) {
          onLoad();
        }
      }
    }
  };

  return (
    <section style={containerStyle}>
      {isCameraInitialized ? null : (
        <div style={styles.barcodeScannerError}>
          <FiCameraOff size={300} style={styles.barcodeScannerErrorSvg} />
        </div>
      )}
      <div
        style={{
          ...styles.container,
          ...(isCameraInitialized ? styles.barcodeScannerVisible : {}),
          ...videoContainerStyle,
        }}>
        <video
          ref={videoRef}
          muted
          onLoadedData={onLoadedData}
          id={videoId}
          style={{
            ...styles.video,
            ...videoStyle,
            transform: `${videoStyle?.transform ?? ''} ${constraints.facingMode === 'user' ? 'scaleX(-1)' : ''
              }`,
          }}
        />
        {!Viewfinder ? null : <Viewfinder />}
      </div>
    </section>
  );
};

BarcodeScanner.displayName = 'BarcodeScanner';

export default BarcodeScanner;
