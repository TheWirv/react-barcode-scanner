import {createRef, ReactEventHandler} from 'react';
import {QrCodeScannerProps as Props} from '../types';
import {useQrCodeScanner} from './hooks';
import {styles} from './styles';

export const QrCodeScanner = ({
  videoContainerStyle,
  containerStyle,
  videoStyle,
  constraints = {facingMode: 'user'},
  ViewFinder,
  scanDelay = 500,
  className,
  onResult,
  onLoad,
  videoId = 'video',
}: Props) => {
  const videoRef = createRef<HTMLVideoElement>();

  useQrCodeScanner({constraints, scanDelay, onResult, videoId});

  const onLoadedData: ReactEventHandler<HTMLVideoElement> = () => {
    if (videoRef.current) {
      const {readyState, HAVE_ENOUGH_DATA} = videoRef.current;

      if (onLoad !== undefined && readyState === HAVE_ENOUGH_DATA) {
        onLoad();
      }
    }
  };

  return (
    <section className={className} style={containerStyle}>
      <div style={{...styles.container, ...videoContainerStyle}}>
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
