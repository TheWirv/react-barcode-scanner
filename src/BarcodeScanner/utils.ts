import {MutableRefObject} from 'react';
import {IScannerControls, BrowserMultiFormatReader} from '@zxing/browser';
import {
  NotFoundException,
  ChecksumException,
  FormatException,
} from '@zxing/library';
import {BarcodeScannerProps} from '../types';

export async function decodeBarcodeFromConstraints(
  controlsArrayRef: MutableRefObject<IScannerControls[]>,
  codeReader: BrowserMultiFormatReader,
  hasUnmountedRef: MutableRefObject<boolean>,
  options: Pick<
    BarcodeScannerProps,
    'constraints' | 'videoId' | 'onSuccess' | 'onError'
  >
): Promise<void> {
  const {constraints, videoId, onSuccess, onError} = options;

  try {
    const controls = await codeReader.decodeFromConstraints(
      {audio: false, video: constraints},
      videoId,
      (result, error) => {
        if (result) {
          onSuccess(result.getText());
        } else if (
          error &&
          onError &&
          !(
            error instanceof NotFoundException ||
            error instanceof ChecksumException ||
            error instanceof FormatException
          )
        ) {
          onError(error);
        }
      }
    );

    if (!hasUnmountedRef.current) {
      controlsArrayRef.current.push(controls);
    } else {
      controls.stop();
    }
  } catch (error) {
    if (error && onError) {
      onError(error as Error);
    }
  }
}
