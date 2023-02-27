import {CSSProperties} from 'react';

export const styles: Record<
  | 'qrCodeScannerError'
  | 'qrCodeScannerErrorSvg'
  | 'container'
  | 'qrCodeScannerVisible'
  | 'video',
  CSSProperties
> = {
  qrCodeScannerError: {
    border: '8px #eee solid',
    borderRadius: '10px',
    padding: '2rem',
  },
  qrCodeScannerErrorSvg: {
    width: '75%',
    height: '75%',
    display: 'block',
    opacity: 0.2,
    margin: '0 auto',
  },
  container: {
    width: '100%',
    paddingTop: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'none',
  },
  qrCodeScannerVisible: {
    display: 'block',
  },
  video: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    overflow: 'hidden',
    position: 'absolute',
    transform: undefined,
  },
};
