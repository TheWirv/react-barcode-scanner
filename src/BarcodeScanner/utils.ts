import {RefObject} from 'react';
import {BrowserMultiFormatReader} from '@zxing/browser';
import {
  NotFoundException,
  ChecksumException,
  FormatException,
} from '@zxing/library';
import {BarcodeScannerProps} from '../types';

export async function decodeBarcodeFromConstraints(
  codeReader: BrowserMultiFormatReader,
  videoElement: RefObject<HTMLVideoElement>,
  {
    constraints,
    onSuccess,
    onError,
  }: Pick<BarcodeScannerProps, 'constraints' | 'onSuccess' | 'onError'>
): Promise<void> {
  if (!videoElement.current) return;

  try {
    const result = await codeReader.decodeOnceFromConstraints(
      {audio: false, video: constraints, preferCurrentTab: true},
      videoElement.current
    );

    onSuccess(result.getText());
  } catch (error) {
    if (
      error &&
      onError &&
      !(
        error instanceof NotFoundException ||
        error instanceof ChecksumException ||
        error instanceof FormatException
      )
    ) {
      onError(error as Error);
    }
  }
}
