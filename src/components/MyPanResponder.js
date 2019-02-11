import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, PanResponder } from 'react-native';

// utils
import {
  getMoveDistance,
  handleDirection,
  getRealDirection,
} from '../utils/base';

const InitCacheData = {
  moveX: 0,
  moveY: 0,
  location: null,
  direction: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Fix android panResponder
  },
});

class MyPanResponder extends React.PureComponent {
  constructor(props) {
    super(props);
    // 是否双击了
    this.isDoublePress = false;
    // 是否是长按
    this.isLongPress = false;
    // 上次点击时间
    this.lastPressTime = 0;
    // 定时器
    this.singlePressTimeout = null;
    this.longPressTimeout = null;
    // 缓存传出数据
    this.cacheData = InitCacheData;
  }
  componentWillMount() {
    this.watcher = PanResponder.create({
      onStartShouldSetPanResponder: () => true, // 对触摸进行响应
      // onMoveShouldSetPanResponder: () => true, // 对滑动进行响应
      onPanResponderTerminationRequest: () => false,
      // 激活
      onPanResponderGrant: (e, gestureState) => {
        const {
          props: {
            onStart,
            //
            onLongPress,
            longPressTime,
            //
            doublePressInterval,
            onDoublePress,
          },
        } = this;
        // 开始手势操作
        this.isDoublePress = false;
        this.isLongPress = false;

        // 任何手势开始，都清空单击计时器
        if (this.singlePressTimeout) {
          clearTimeout(this.singlePressTimeout);
        }

        // 计算长按
        this.longPressTimeout && clearTimeout(this.longPressTimeout);

        this.longPressTimeout = setTimeout(() => {
          this.isLongPress = true;
          onLongPress && onLongPress();
        }, longPressTime);

        // 一个手指情况
        if (e.nativeEvent.changedTouches.length <= 1) {
          if (new Date().getTime() - this.lastPressTime < (doublePressInterval || 0)) {
            // 认为触发了双击
            this.lastPressTime = 0;
            onDoublePress && onDoublePress();
            // 取消长按
            clearTimeout(this.longPressTimeout);
            // 缩放
            this.isDoublePress = true;
          } else {
            this.lastPressTime = new Date().getTime();
          }
        }
        // handle direction
        onStart(handleDirection(gestureState));
      },
      // 移动
      onPanResponderMove: (e, gestureState) => {
        // 屏蔽双击位移
        if (this.isDoublePress) return;
        const {
          props: {
            pressDistance,
            onMove,
          },
        } = this;
        // 单个手指
        if (e.nativeEvent.changedTouches.length <= 1) {
          const moveDistance = getMoveDistance(gestureState);
          if (moveDistance > (pressDistance || 0)) {
            this.longPressTimeout && clearTimeout(this.longPressTimeout);
          }
        } else {
          // 多个手指
          this.longPressTimeout && clearTimeout(this.longPressTimeout);
        }
        // handle direction
        const resData = handleDirection(gestureState);
        const currMap = getRealDirection(resData, this.cacheData);
        this.cacheData = currMap;
        onMove(currMap);
      },
      // 动作释放
      onPanResponderRelease: (e, gestureState) => {
        // 取消长按
        this.longPressTimeout && clearTimeout(this.longPressTimeout);

        // 双击结束 / 长按结束
        if (this.isDoublePress || this.isLongPress) return;

        const {
          props: {
            onPress,
            pressDistance,
            singlePressTime,
            onEnd,
          },
        } = this;

        // 如果是单个手指、距离上次按住大于预设秒、滑动距离小于预设值, 则可能是单击（如果后续双击间隔内没有开始手势）
        const moveDistance = getMoveDistance(gestureState);
        if (e.nativeEvent.changedTouches.length === 1 && moveDistance < (pressDistance || 0)) {
          this.singlePressTimeout = setTimeout(() => {
            onPress && onPress(e.nativeEvent);
          }, singlePressTime);
          return;
        }
        // handle direction
        const resData = handleDirection(gestureState);
        const currMap = getRealDirection(resData, this.cacheData);
        this.cacheData = InitCacheData;
        onEnd(currMap);
      },
      onPanResponderTerminate: () => {
        //
      },
    });
  }
  render() {
    const {
      props: {
        style,
        children,
      },
    } = this;
    return (
      <View
        {...this.watcher.panHandlers}
        style={[
          styles.container,
          style,
        ]}
      >
        {children}
      </View>
    );
  }
}

MyPanResponder.defaultProps = {
  style: {},
  children: null,
  onStart: () => null,
  onMove: () => null,
  onEnd: () => null,
  // press event
  pressDistance: 10,
  singlePressTime: 275,
  onPress: () => null,
  // long press
  longPressTime: 800,
  onLongPress: () => null,
  // double press
  doublePressInterval: 275,
  onDoublePress: () => null,
};

MyPanResponder.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  children: PropTypes.node,
  onStart: PropTypes.func,
  onMove: PropTypes.func,
  onEnd: PropTypes.func,
  // press event
  pressDistance: PropTypes.number,
  singlePressTime: PropTypes.number,
  onPress: PropTypes.func,
  // long press
  longPressTime: PropTypes.number,
  onLongPress: PropTypes.func, // if you open js debugger, setTimeout will don't work on android
  // double press
  doublePressInterval: PropTypes.number,
  onDoublePress: PropTypes.func,
};

export default MyPanResponder;
