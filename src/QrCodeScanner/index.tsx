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
  videoId = 'video',
}: Props) => {
  useQrCodeScanner({constraints, scanDelay, onResult, videoId});

  return (
    <section className={className} style={containerStyle}>
      <div style={{...styles.container, ...videoContainerStyle}}>
        <video
          muted
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
