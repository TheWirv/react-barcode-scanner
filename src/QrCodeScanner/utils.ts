import {MutableRefObject} from 'react';
import {BrowserQRCodeReader, IScannerControls} from '@zxing/browser';
import {OnResultFunction} from '../types';

let v: unknown;
const f = () => typeof v;

export function isValidType(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  name: string,
  type: ReturnType<typeof f>
): boolean {
  const isValid = typeof value === type;

  if (!isValid) {
    console.warn(
      `[ReactQrCodeScanner]: Expected "${name}" to be a of type "${type}".`
    );
  }

  return isValid;
}

export async function decodeQrCodeFromConstraints(
  codeReader: BrowserQRCodeReader,
  constraints: MediaTrackConstraints,
  videoId: string,
  onResult: OnResultFunction,
  controlsRef: MutableRefObject<IScannerControls | null | undefined>
): Promise<void> {
  try {
    if (controlsRef.current === undefined) {
      controlsRef.current = await codeReader.decodeFromConstraints(
        {audio: false, video: constraints},
        videoId,
        (result, error) => {
          if (controlsRef.current === null) {
            throw new Error('Component is unmounted');
          }

          onResult(result, error, codeReader);
        }
      );
    }
  } catch (error) {
    onResult(null, error as Error, codeReader);
  }
}
