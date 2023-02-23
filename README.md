# React QR Code Scanner [![npm version](https://badge.fury.io/js/react-qr-reader.svg)](https://badge.fury.io/js/react-qr-reader) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![Known Vulnerabilities](https://snyk.io/test/github/react-qr-reader/react-qr-reader/badge.svg)](https://snyk.io/test/github/react-qr-reader/react-qr-reader)

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
yarn add react-qr-code-scanner
```

### npm

```bash
npm i react-qr-code-scanner
```

## Example Usage

After reading and performing the previous steps, you should be able to import the library and use it like in this example:

```javascript
import React, {useState} from 'react';
import {QrCodeScanner} from 'react-qr-code-scanner';

const Test = (props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrCodeScanner
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{width: '100%'}}
      />
      <p>{data}</p>
    </>
  );
};
```

## Component API

The `QrCodeScanner` component has the following props:

| Properties          | Types                                                                                           | Default Value            | Description                                              |
| ------------------- | ----------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------- |
| constraints         | [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) | `{ facingMode: 'user' }` | Specify which camera should be used (if available).      |
| onResult            | `function`                                                                                      | none                     | Scan event handler                                       |
| videoId             | `string`                                                                                        | `video`                  | The ID for the video element                             |
| scanDelay           | `number`                                                                                        | `500`                    | The scan period for the QR hook                          |
| ViewFinder          | component                                                                                       | none                     | ViewFinder component to rendering over the video element |
| className           | string                                                                                          | none                     | ClassName for the container element.                     |
| containerStyle      | object                                                                                          | none                     | Style object for the container element.                  |
| videoContainerStyle | object                                                                                          | none                     | Style object for the video container element.            |
| videoStyle          | object                                                                                          | none                     | Style object for the video element.                      |

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
