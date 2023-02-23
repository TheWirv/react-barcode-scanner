import {CSSProperties, ReactElement} from 'react';
import {BrowserQRCodeReader} from '@zxing/browser';
import {Result} from '@zxing/library';

export type QrCodeScannerProps = {
  /**
   * Media track constraints object, to specify which camera and capabilities to use
   */
  constraints?: MediaTrackConstraints;
  /**
   * Called when an error occurs.
   */
  onResult?: OnResultFunction;
  /**
   * Property that represents the view finder component
   */
  ViewFinder?: () => ReactElement | null;
  /**
   * Property that represents the scan period
   */
  scanDelay?: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;
  /**
   * Property that represents an optional className to modify styles
   */
  className?: string;
  /**
   * Property that represents a style for the container
   */
  containerStyle?: CSSProperties;
  /**
   * Property that represents a style for the video container
   */
  videoContainerStyle?: CSSProperties;
  /**
   * Property that represents a style for the video
   */
  videoStyle?: CSSProperties;
};

export type OnResultFunction = (
  /**
   * The QR values extracted by Zxing
   */
  result?: Result | null,
  /**
   * The name of the exceptions thrown while reading the QR
   */
  error?: Error | null,
  /**
   * The instance of the QR browser reader
   */
  codeReader?: BrowserQRCodeReader
) => void;

export type UseQrCodeScannerHookProps = {
  /**
   * Media constraints object, to specify which camera and capabilities to use
   */
  constraints: MediaTrackConstraints;
  /**
   * Callback for retrieving the result
   */
  onResult?: OnResultFunction;
  /**
   * Property that represents the scan period
   */
  scanDelay: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId: string;
};

export type UseQrCodeScannerHook = (props: UseQrCodeScannerHookProps) => void;
