import {
  useState,
  useMemo,
  useRef,
  createRef,
  useEffect,
  ReactEventHandler,
} from 'react';
import {BrowserMultiFormatReader, IScannerControls} from '@zxing/browser';
import {FiCameraOff} from 'react-icons/fi';
import {BarcodeScannerProps as Props} from '../types';
import {decodeBarcodeFromConstraints} from './utils';
import {styles} from './styles';

const BarcodeScanner = ({
  doScan = true,
  constraints = {facingMode: 'user'},
  onSuccess,
  onError,
  onLoad,
  videoId = 'video',
  Viewfinder,
  containerStyle,
  videoContainerStyle,
  videoStyle,
}: Props) => {
  const [isCameraInitialized, setIsCameraInitialized] = useState<boolean>();
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);
  const hasUnmountedRef = useRef(false);
  const controlsArrayRef = useRef<IScannerControls[]>([]);
  const videoRef = createRef<HTMLVideoElement>();

  const cleanUpControls = () => {
    controlsArrayRef.current.forEach(({stop}) => stop());
    controlsArrayRef.current = [];
  };

  useEffect(
    () => () => {
      cleanUpControls();
      hasUnmountedRef.current = true;
    },
    []
  );

  useEffect(() => {
    if (onSuccess !== undefined && onError !== undefined) {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
        const message =
          'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';

        console.warn(`[ReactBarcodeScanner]: ${message}`);
        onError(new Error(message));
      }

      if (doScan) {
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
      } else {
        cleanUpControls();
      }
    }

    return cleanUpControls;
  }, [onSuccess, onError, doScan, codeReader, constraints, videoId]);

  const onLoadedData: ReactEventHandler<HTMLVideoElement> = () => {
    if (videoRef.current) {
      const {readyState, HAVE_ENOUGH_DATA} = videoRef.current;

      if (readyState === HAVE_ENOUGH_DATA) {
        setIsCameraInitialized(true);
        onLoad !== undefined && onLoad();
      }
    }
  };

  return (
    <section style={containerStyle}>
      {!isCameraInitialized && (
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
