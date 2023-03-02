import {ReactElement, CSSProperties} from 'react';

export type BarcodeScannerProps = {
  /**
   * Controls whether the scanner should be scanning or not
   */
  doScan?: boolean;
  /**
   * Media track constraints object, to specify which camera and capabilities to use
   */
  constraints?: MediaTrackConstraints;
  /**
   * Callback for retrieving the result
   */
  onSuccess: (text: string) => void;
  /**
   * Callback for retrieving the error when one occurs
   */
  onError?: (e?: Error) => void;
  /**
   * Callback for when the video feed has been loaded
   */
  onLoad?: () => void;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;
  /**
   * Property that represents the viewfinder component
   */
  Viewfinder?: () => ReactElement | null;
  /**
   * Property that represents a style for the wrapping container
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
