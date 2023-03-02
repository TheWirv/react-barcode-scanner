# React Barcode Scanner [![npm version](https://badge.fury.io/js/@thewirv%2Freact-barcode-scanner.svg)](https://badge.fury.io/js/@thewirv%2Freact-barcode-scanner) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![Known Vulnerabilities](https://snyk.io/test/github/TheWirv/react-barcode-scanner/badge.svg)](https://snyk.io/test/github/TheWirv/react-barcode-scanner)

:rocket: React Barcode Scanner component.

## Table of contents

- [Use Case](#use-case)
- [Compatibility](#compatibility)
- [Installation](#installation)
  - [yarn](#yarn)
  - [npm](#npm)
- [Example Usage](#example-usage)
- [BarcodeScanner API](#component-api)
- [Browser support](#browser-support)
- [Issues](#issues)
- [Contributing](#contributing)
- [License](#license)

## Use Case

You need a component for scanning QR codes or other barcodes from a web browser based app.

## Compatibility

This component has been tested in the following browsers:

- Chrome Mac OS & Android
- Firefox Mac OS & Android
- Safari Mac OS & iOS

Since this library does internal use of hooks you need `React >= 16.8.0`.

This library utilizes the [ZXing library](https://github.com/zxing-js/browser) and therefore supports all their [supported formats](https://github.com/zxing-js/library#supported-formats) of 1D and 2D barcodes.

## Installation

You can install this library via yarn or npm.

### yarn

```bash
yarn add @thewirv/react-barcode-scanner
```

### npm

```bash
npm i @thewirv/react-barcode-scanner
```

## Example Usage

After reading and performing the previous steps, you should be able to import the library and use it like in this example:

```typescript
import {useState} from 'react';
import {BarcodeScanner} from '@thewirv/react-barcode-scanner';

const Test = (props: Props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <BarcodeScanner
        onSuccess={(text) => setData(text)}
        onError={(error) => {
          if (error) {
            console.error(error.message);
          }
        }}
        onLoad={() => console.log('Video feed has loaded!')}
        containerStyle={{width: '100%'}}
      />
      <p>{data}</p>
    </>
  );
};
```

## Component API

The `BarcodeScanner` component has the following props:

| Properties            | Types                                                                                           | Default Value            | Required | Description                                              |
| --------------------- | ----------------------------------------------------------------------------------------------- | ------------------------ | -------- | -------------------------------------------------------- |
| `doScan`              | `boolean`                                                                                       | `true`                   | ☐        | Controls whether the scanner should be scanning or not   |
| `constraints`         | [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) | `{ facingMode: 'user' }` | ☐        | Specify which camera should be used (if available)       |
| `onSuccess`           | `(text: string) => void`                                                                        | none                     | 🗹        | Callback for retrieving the result                       |
| `onError`             | `(e?: Error) => void`                                                                           | none                     | ☐        | Callback for retrieving the error when one occurs        |
| `onLoad`              | `() => void`                                                                                    | none                     | ☐        | Callback for when the video feed has been loaded         |
| `videoId`             | `string`                                                                                        | `'video'`                | ☐        | The ID for the video element                             |
| `Viewfinder`          | `React.ReactElement`                                                                            | none                     | ☐        | Viewfinder component to rendering over the video element |
| `containerStyle`      | `React.CSSProperties`                                                                           | none                     | ☐        | Style object for the wrapping container element          |
| `videoContainerStyle` | `React.CSSProperties`                                                                           | none                     | ☐        | Style object for the video container element             |
| `videoStyle`          | `React.CSSProperties`                                                                           | none                     | ☐        | Style object for the video element                       |

## Maintainers

- Improved by [@TheWirv](https://github.com/TheWirv) .
- Created by [@JodusNodus](https://github.com/JodusNodus) .
- Revived thanks to [@JonatanSalas](https://github.com/JonatanSalas) and his company [@BlackBoxVision](https://github.com/BlackBoxVision) .

## Browser Support

If you need to support older browsers, checkout [this guide](https://github.com/zxing-js/library#browser-support) in how to make it compatible with legacy ones

## Issues

Please, open an [issue](https://github.com/TheWirv/react-barcode-scanner/issues) following one of the issues templates. We will do our best to fix them.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/TheWirv/react-barcode-scanner/blob/master/LICENSE) for more information.
