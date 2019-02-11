// utils
import { getScreenWidth } from './device';

// contents
import {
  DIRECTION_ROW,
  DIRECTION_ROW_REVERSE,
  DIRECTION_COLUMN,
  DIRECTION_COLUMN_REVERSE,
  LOCATION_LEFT,
  LOCATION_RIGHT,
} from '../constants';

// 获取偏移量
export function getMoveDistance(gestureState) {
  return Math.sqrt((gestureState.dx * gestureState.dx) + (gestureState.dy * gestureState.dy));
}

// 处理方向
export function handleDirection(gestureState, deviceWidth = getScreenWidth()) {
  const moveX = gestureState.moveX - gestureState.x0;
  const moveY = gestureState.y0 - gestureState.moveY;
  const resMoveX = moveX < 0 ? -moveX : moveX;
  const resMoveY = moveY < 0 ? -moveY : moveY;
  // 横向逻辑
  if (resMoveX > resMoveY) {
    return ({
      moveX,
      moveY: 0,
      direction: moveX > 0 ? DIRECTION_ROW : DIRECTION_ROW_REVERSE,
    });
  }
  // 纵向逻辑
  const location = (deviceWidth / 2) - gestureState.x0;
  return ({
    moveX: 0,
    moveY,
    location: location > 0 ? LOCATION_LEFT : LOCATION_RIGHT,
    direction: moveY < 0 ? DIRECTION_COLUMN : DIRECTION_COLUMN_REVERSE,
  });
}

// 获取移动中真实方向, (开始是横向, 移动变为纵向不计入)
export function getRealDirection(currMap, prevMap) {
  if (!prevMap.direction) return currMap;
  if (currMap.direction.slice(0, 14) === prevMap.direction.slice(0, 14)) return currMap;
  return prevMap;
}
