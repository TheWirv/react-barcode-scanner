# React QR Code Scanner [![npm version](https://badge.fury.io/js/@thewirv%2Freact-qr-code-scanner.svg)](https://badge.fury.io/js/@thewirv%2Freact-qr-code-scanner) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![Known Vulnerabilities](https://snyk.io/test/github/TheWirv/react-qr-code-scanner/badge.svg)](https://snyk.io/test/github/TheWirv/react-qr-code-scanner)

:rocket: React QR Code Scanner component.

## Table of contents

- [Use Case](#use-case)
- [Compatibility](#compatibility)
- [Installation](#installation)
  - [yarn](#yarn)
  - [npm](#npm)
- [Example Usage](#example-usage)
- [QrReader API](#component-api)
- [Browser support](#browser-support)
- [Issues](#issues)
- [Contributing](#contributing)
- [License](#license)

## Use Case

You need a component for scanning QR codes from a web browser based app.

## Compatibility

This component has been tested in the following browsers:

- Chrome Mac OS & Android
- Firefox Mac OS & Android
- Safari Mac OS & iOS

Since this library does internal use of hooks you need `React >= 16.8.0`.

## Installation

You can install this library via yarn or npm.

### yarn

```bash
yarn add @thewirv/react-qr-code-scanner
```

### npm

```bash
npm i @thewirv/react-qr-code-scanner
```

## Example Usage

After reading and performing the previous steps, you should be able to import the library and use it like in this example:

```typescript
import {useState} from 'react';
import {QrCodeScanner} from '@thewirv/react-qr-code-scanner';

const Test = (props: Props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrCodeScanner
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

The `QrCodeScanner` component has the following props:

| Properties            | Types                                                                                           | Default Value            | Required | Description                                              |
| --------------------- | ----------------------------------------------------------------------------------------------- | ------------------------ | -------- | -------------------------------------------------------- |
| `doScan`              | `boolean`                                                                                       | true                     | ☐        | Controls whether the scanner should be scanning or not   |
| `constraints`         | [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) | `{ facingMode: 'user' }` | ☐        | Specify which camera should be used (if available)       |
| `onSuccess`           | `(text: string) => void`                                                                        | none                     | 🗹        | Callback for retrieving the result                       |
| `onError`             | `(e?: Error) => void`                                                                           | none                     | ☐        | Callback for retrieving the error when one occurs        |
| `onLoad`              | `() => void`                                                                                    | none                     | ☐        | Callback for when the video feed has been loaded         |
| `videoId`             | `string`                                                                                        | `video`                  | ☐        | The ID for the video element                             |
| `ViewFinder`          | `React.ReactElement`                                                                            | none                     | ☐        | ViewFinder component to rendering over the video element |
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

Please, open an [issue](https://github.com/react-qr-reader/react-qr-reader/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/react-qr-reader/react-qr-reader/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/react-qr-reader/react-qr-reader/blob/master/LICENSE) for more information.
