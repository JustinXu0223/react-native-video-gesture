# js-react-native-gesture

 
## Installation

`yarn add js-react-native-gesture`

## Usage

`
import RNGesture, { 
    DIRECTION_ROW,
    DIRECTION_ROW_REVERSE,
    DIRECTION_COLUMN,
    DIRECTION_COLUMN_REVERSE,
    LOCATION_LEFT,
    LOCATION_RIGHT
} from 'js-react-native-gesture';
`


## Props
#### `style: object`

The style of View.

#### `children: node`

React children node

#### `onMove:({ moveX: number, moveY: number, location: string, direction: string }) => null`

onPanResponderMove callback func

#### `onEnd:({ moveX: number, moveY: number, location: string, direction: string }) => null`

onPanResponderRelease callback func

#### `pressDistance: number`

The number of distance when onPress.

#### `singlePressTime: number`

The number of time when onPress.

#### `onPress({}) => null`

onPress func.

#### `longPressTime: number`

The number of time when onLongPress.

#### `onLongPress({}) => null`

onLongPress func.

#### `doublePressInterval: number`

The number of time when onDoublePress.

#### `onDoublePress({}) => null`

onDoublePress func.


## Example code
`
>1). $ example/src/app.js
`

## Start
`
>1). $ cd example && yarn setup && yarn start

>2). $ cd example && yarn ios
`
