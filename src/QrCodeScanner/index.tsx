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
import {QrCodeScannerProps as Props} from '../types';
import {decodeQrCodeFromConstraints} from './utils';
import {styles} from './styles';

const QrCodeScanner = ({
  doScan = true,
  constraints = {facingMode: 'user'},
  onSuccess,
  onError,
  onLoad,
  videoId = 'video',
  ViewFinder,
  containerStyle,
  videoContainerStyle,
  videoStyle,
}: Props) => {
  const [isCameraInitialized, setIsCameraInitialized] = useState<boolean>();
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);
  const hasUnmountedRef = useRef(false);
  const controlsRef = useRef<IScannerControls>();
  const videoRef = createRef<HTMLVideoElement>();

  useEffect(
    () => () => {
      controlsRef.current?.stop();
      hasUnmountedRef.current = true;
    },
    []
  );

  useEffect(() => {
    if (onSuccess !== undefined && onError !== undefined) {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
        const message =
          'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';

        console.warn(`[ReactQrCodeScanner]: ${message}`);
        onError(new Error(message));
      }

      if (doScan) {
        controlsRef.current = undefined;

        decodeQrCodeFromConstraints(controlsRef, codeReader, hasUnmountedRef, {
          constraints,
          videoId,
          onSuccess,
          onError,
        });
      } else {
        controlsRef.current?.stop();
      }
    }
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
        <div style={styles.qrCodeScannerError}>
          <FiCameraOff size={300} style={styles.qrCodeScannerErrorSvg} />
        </div>
      )}
      <div
        style={{
          ...styles.container,
          ...(isCameraInitialized ? styles.qrCodeScannerVisible : {}),
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
        {!!ViewFinder && <ViewFinder />}
      </div>
    </section>
  );
};

QrCodeScanner.displayName = 'QrCodeScanner';

export default QrCodeScanner;
