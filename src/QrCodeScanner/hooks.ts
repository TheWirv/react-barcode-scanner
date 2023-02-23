import {useEffect, useRef} from 'react';
import {BrowserQRCodeReader, IScannerControls} from '@zxing/browser';
import {UseQrCodeScannerHook} from '../types';
import {isValidType, decodeQrCodeFromConstraints} from './utils';

export const useQrCodeScanner: UseQrCodeScannerHook = ({
  scanDelay: delayBetweenScanAttempts,
  constraints,
  onResult,
  videoId,
}) => {
  const controlsRef = useRef<IScannerControls | null>();

  useEffect(() => {
    if (
      onResult !== undefined &&
      isValidType(onResult, 'onResult', 'function') &&
      isValidType(constraints, 'constraints', 'object')
    ) {
      const codeReader = new BrowserQRCodeReader(undefined, {
        delayBetweenScanAttempts,
      });

      if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
        const message =
          'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';

        console.warn(`[ReactQrCodeScanner]: ${message}`);
        onResult(null, new Error(message), codeReader);
      }

      decodeQrCodeFromConstraints(
        codeReader,
        constraints,
        videoId,
        onResult,
        controlsRef
      );
    }
  }, [delayBetweenScanAttempts, onResult, constraints, videoId]);

  useEffect(
    () => () => {
      if (controlsRef.current === undefined) {
        // invalidate the ref as the component was unmounted
        controlsRef.current = null;
      } else {
        controlsRef.current?.stop();
      }
    },
    []
  );
};
