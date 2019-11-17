/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {PanResponder, View, Platform} from 'react-native';
import Svg, {
  Circle,
  Rect,
  Line,
  G,
  LinearGradient,
  Path,
  Defs,
  Stop,
  Image,
} from 'react-native-svg';
import range from 'lodash.range';
import PropTypes from 'prop-types';

const DIVIDER_BAR_WIDTH = 15;
const DIVIDER_BAR_WIDTH_INDEX1 = 4;

const SLIDE_DIVIDER_TYPE = {
  CIRCLE: 'CIRCLE',
  SQUARE: 'SQUARE',
  BAR: 'BAR',
  ICON: 'ICON',
};

const COMPONENT_TYPE = {
  SLIDER: 'SLIDER',
  PIE_CHART: 'PIE_CHART',
};

export default class CircularMultipleSlider extends PureComponent {
  static propTypes = {
    values: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    componentType: PropTypes.string,
    dividerComponent: PropTypes.array,
    dividerComponentSize: PropTypes.number,
    minimumStopValue: PropTypes.number,
    slideDividerType: PropTypes.string,
    slideDividerIcon: PropTypes.any,
    hideSlideDividerType: PropTypes.bool,
    onPanResponderGrant: PropTypes.func,
    onPanResponderRelease: PropTypes.func,
    borderColor: PropTypes.string,
    segments: PropTypes.number,
    borderWidth: PropTypes.number,
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    separatorColor: PropTypes.string,
  };

  static defaultProps = {
    values: [],
    colors: [],
    componentType: COMPONENT_TYPE.SLIDER,
    dividerComponent: [],
    dividerComponentSize: 50,
    minimumStopValue: 1, //Setting the MINIMUM_ANGLE_LENGTH default unit as 1
    slideDividerType: SLIDE_DIVIDER_TYPE.BAR, //Setting the slideDividerType default as BAR
    hideSlideDividerType: false,
    borderColor: '',
    segments: 5,
    borderWidth: 3,
    strokeWidth: 30,
    radius: 120,
    separatorColor: '#171717',
  };

  constructor(props) {
    super(props);
    this.state = {
      circleCenterX: false,
      circleCenterY: false,
      startAngle: [],
      angleLength: [],
    };
    this.startPosition = [];
    this.isPieChartComponentType =
      this.props.componentType.toUpperCase() === COMPONENT_TYPE.PIE_CHART
        ? true
        : false;
    this.containerWidth = this.getContainerWidth();
  }

  componentWillMount() {
    this.constructAngles();
  }

  updateValues(values) {
    this.props.values = values;
    this.constructAngles();
  }

  onLayout = () => {
    this.setCircleCenter();
  };

  setCircleCenter = () => {
    this._circle.measure((x, y, w, h, px, py) => {
      const halfOfContainer = this.getContainerWidth() / 2;
      this.setState({
        circleCenterX: px + halfOfContainer,
        circleCenterY: py + halfOfContainer,
      });
    });
  };

  getContainerWidth() {
    //If it is PieChartComponentType then we will consider radius as 0 otherwise we will set the user provided radius
    //Also consider the condition the strokeWidth is greater than radius
    let radius =
      this.isPieChartComponentType && this.props.strokeWidth > this.props.radius
        ? 0
        : this.props.radius;
    return this.props.strokeWidth * 4 + radius * 2;
  }

  constructAngles() {
    let valuesArray = [],
      startAngle = [],
      angleLength = [],
      accumulatedAngleLength = 0;
    const {
      strokeWidth,
      radius,
      dividerComponentSize,
      values,
      minimumStopValue,
    } = this.props;
    const totalCount = this.getTotalCount();
    //If it is PieChartComponentType then we will consider padding as 0 otherwise we will set the as strokeWidth + dividerComponentSize / 2
    //Also consider the condition the strokeWidth is greater than radius
    const padding =
      this.isPieChartComponentType && this.props.strokeWidth > this.props.radius
        ? 0
        : strokeWidth + dividerComponentSize / 2;
    values &&
      values.forEach(itemValue => {
        valuesArray.push(this.getPercentage(totalCount, itemValue));
      });
    //Setting the MINIMUM_STOP_ANGLE_LENGTH value unit as 1, we are deriving this value by considering 2*PI as totalCount
    this.minimumStopAngleLength = (2 * Math.PI * minimumStopValue) / totalCount;
    //Setting the MINIMUM_VALUE_TO_SHOW_DIVIDER_COMPONENT value unit as 50, we are deriving this value by considering 2*PI as 4*Radius
    this.minimumAngleLengthToShowDividerComponent =
      (2 * Math.PI * (dividerComponentSize + padding)) / (4 * radius);
    valuesArray.forEach(value => {
      const length = 2 * Math.PI * (value / 100);
      startAngle.push(accumulatedAngleLength);
      accumulatedAngleLength = accumulatedAngleLength + length;
      angleLength.push(length);
    });
    this.setState({
      startAngle,
      angleLength,
    });
  }

  getTotalCount() {
    let totalCount = 0;
    this.props.values &&
      this.props.values.forEach(itemValue => {
        totalCount = totalCount + itemValue;
      });
    return totalCount;
  }

  getPercentage(totalCount, count) {
    return ((count * 100) / totalCount).toFixed(0);
  }

  getGradientId(index) {
    return `gradient${index}`;
  }

  calculateCircularArc(
    index0,
    segments,
    radius,
    startAngle0 = 0,
    angleLength0 = 2 * Math.PI,
  ) {
    const startAngle = startAngle0;
    const angleLength = angleLength0;
    const index = index0 + 1;
    const fromAngle = (angleLength / segments) * (index - 1) + startAngle;
    const toAngle = (angleLength / segments) * index + startAngle;
    const fromX = radius * Math.sin(fromAngle);
    const fromY = -radius * Math.cos(fromAngle);
    const toX = radius * Math.sin(toAngle);
    const toY = -radius * Math.cos(toAngle);
    return {
      fromX,
      fromY,
      toX,
      toY,
    };
  }

  renderDividerComponent(index) {
    if (this.startPosition.length < this.state.angleLength.length) {
      return;
    }
    const {dividerComponent} = this.props;
    const {iconXPosition, iconYPosition} = this.getIconPosition(index);
    return (
      <View
        style={{
          marginTop: iconYPosition + this.containerWidth / 2,
          marginLeft: iconXPosition + this.containerWidth / 2,
        }}>
        {dividerComponent[index]}
      </View>
    );
  }

  getMultiplier(midPosition, length, isHorizontalAxis) {
    let multiplierX = 1,
      multiplierY = 1;

    switch (true) {
      case midPosition <= 2 * Math.PI && midPosition > (3 * Math.PI) / 2:
        multiplierX = -1;
        multiplierY = length >= Math.PI ? (isHorizontalAxis ? -1 : 0) : -1;
        break;
      case midPosition <= (3 * Math.PI) / 2 && midPosition > Math.PI:
        multiplierX = length >= Math.PI ? (isHorizontalAxis ? 0 : -1) : -1;
        multiplierY = length >= Math.PI ? (isHorizontalAxis ? 1 : 0) : 1;
        break;
      case midPosition <= Math.PI && midPosition > Math.PI / 2:
        multiplierX = length >= Math.PI ? (isHorizontalAxis ? 0 : 1) : 1;
        multiplierY = length >= Math.PI ? (isHorizontalAxis ? 1 : 0) : 1;
        break;
      case midPosition <= Math.PI / 2:
        multiplierX = 1;
        multiplierY = length >= Math.PI ? (isHorizontalAxis ? -1 : 0) : -1;
        break;
      default:
        multiplierX = 1;
        multiplierY = length >= Math.PI ? 0 : -1;
    }
    return {multiplierX: multiplierX, multiplierY: multiplierY};
  }

  getIconPosition(index) {
    const {radius, dividerComponentSize} = this.props;
    //If it is PieChartComponentType then we will consider strokeWidth as 20(Default) otherwise we will set the user provided strokeWidth
    //Also consider the condition the strokeWidth is greater than radius
    const strokeWidth =
      this.isPieChartComponentType && this.props.strokeWidth > radius
        ? 20
        : this.props.strokeWidth;
    const updatedIndex =
      index === this.state.angleLength.length - 1 ? 0 : index + 1;
    const length = this.state.angleLength[index];
    const midPosition = this.state.startAngle[index] + length / 2;
    let positionX =
      (this.startPosition[index].fromX +
        this.startPosition[updatedIndex].fromX) /
      2;
    let positionY =
      (this.startPosition[index].fromY +
        this.startPosition[updatedIndex].fromY) /
      2;
    const isHorizontalAxis =
      Math.abs(this.startPosition[index].fromX) +
        Math.abs(this.startPosition[updatedIndex].fromX) >=
      Math.abs(this.startPosition[index].fromY) +
        Math.abs(this.startPosition[updatedIndex].fromY)
        ? true
        : false;
    const {multiplierX, multiplierY} = this.getMultiplier(
      midPosition,
      length,
      isHorizontalAxis,
    );
    const padding = (strokeWidth + dividerComponentSize) / 2;

    //condition for one value with full circle length
    if (length >= 2 * Math.PI) {
      return {
        iconXPosition: -padding,
        iconYPosition: -padding,
      };
    }

    //Constructing X position
    if (
      (positionX >= 0 && positionX < 2) ||
      (positionX <= 0 && positionX > -2)
    ) {
      if (midPosition >= Math.PI) {
        positionX = isHorizontalAxis
          ? -(strokeWidth / 2)
          : multiplierX * (radius / 2) - strokeWidth / 2;
      } else {
        positionX = isHorizontalAxis
          ? -(strokeWidth / 2)
          : multiplierX * (radius / 2) - padding;
      }
    } else if (positionX < 0) {
      if (length >= Math.PI) {
        positionX = (multiplierX * radius) / 2 - padding;
      } else {
        positionX =
          (Math.abs(positionX) < radius / 2 && !isHorizontalAxis
            ? (multiplierX * radius) / 2
            : positionX) -
          strokeWidth / 2;
      }
    } else {
      if (length >= Math.PI) {
        positionX = isHorizontalAxis
          ? (multiplierX * radius) / 2 - padding
          : (multiplierX * radius) / 2 - strokeWidth / 2;
      } else {
        positionX =
          (Math.abs(positionX) < radius / 2 && !isHorizontalAxis
            ? (multiplierX * radius) / 2
            : positionX) - padding;
      }
    }

    //Constructing Y position
    if (
      (positionY >= 0 && positionY < 2) ||
      (positionY <= 0 && positionY > -2)
    ) {
      positionY = isHorizontalAxis
        ? multiplierY * (radius / 2) - padding
        : -padding;
    } else if (positionY < 0) {
      if (length >= Math.PI) {
        positionY = isHorizontalAxis
          ? (multiplierY * radius) / 2 - padding
          : (multiplierY * radius) / 2 - strokeWidth / 2;
      } else {
        positionY =
          (Math.abs(positionY) < radius / 2 && isHorizontalAxis
            ? (multiplierY * radius) / 2
            : positionY) -
          strokeWidth / 2;
      }
    } else {
      if (length >= Math.PI) {
        positionY = (multiplierY * radius) / 2 - padding;
      } else {
        positionY =
          (Math.abs(positionY) < radius / 2 && isHorizontalAxis
            ? (multiplierY * radius) / 2
            : positionY) - padding;
      }
    }
    return {iconXPosition: positionX, iconYPosition: positionY};
  }

  renderSlideDivider(index) {
    const {
      slideDividerType,
      slideDividerIcon,
      strokeWidth,
      colors,
      separatorColor,
    } = this.props;
    switch (slideDividerType.toUpperCase()) {
      case SLIDE_DIVIDER_TYPE.BAR:
        return (
          <Rect
            y={-(3 * strokeWidth) / 2}
            x={-DIVIDER_BAR_WIDTH / 2}
            width={DIVIDER_BAR_WIDTH}
            rotation={
              180 * ((this.state.startAngle[index] % Math.PI) / Math.PI)
            }
            height={strokeWidth * 3}
            stroke={separatorColor}
            strokeWidth={2}
            fill={colors[index]}
          />
        );
      case SLIDE_DIVIDER_TYPE.SQUARE:
        return (
          <Rect
            y={-(strokeWidth + 10) / 2}
            x={-(strokeWidth + 10) / 2}
            width={strokeWidth + 10}
            rotation={
              180 * ((this.state.startAngle[index] % Math.PI) / Math.PI)
            }
            height={strokeWidth + 10}
            stroke={separatorColor}
            strokeWidth={2}
            fill={colors[index]}
          />
        );
      case SLIDE_DIVIDER_TYPE.CIRCLE:
        return (
          <Circle
            r={strokeWidth / 2}
            fill={colors[index]}
            stroke={separatorColor}
            strokeWidth={1}
          />
        );
      case SLIDE_DIVIDER_TYPE.ICON:
        if (slideDividerIcon) {
          return (
            <Image
              x={-strokeWidth}
              y={-strokeWidth}
              width={strokeWidth * 2}
              height={strokeWidth * 2}
              href={slideDividerIcon}
            />
          );
        }
      default:
        return (
          <Circle
            r={strokeWidth / 2}
            fill={colors[index]}
            stroke={separatorColor}
            strokeWidth={1}
          />
        );
    }
  }

  renderSlider() {
    let slider = [];
    this.state.startAngle.map((value, index) => {
      const {
        dividerComponent,
        strokeWidth,
        radius,
        segments,
        colors,
        separatorColor,
        onUpdate,
        onPanResponderGrant,
        onPanResponderRelease,
        hideSlideDividerType,
      } = this.props;
      const start = this.calculateCircularArc(
        0,
        segments,
        radius,
        value,
        this.state.angleLength[index],
      );
      this.startPosition[index] = start;
      slider.push(
        <Svg
          style={{
            position: 'absolute',
            width: this.containerWidth,
            height: this.containerWidth,
          }}
          key={'circle' + index}
          ref={circle => (this._circle = circle)}
          onLayout={this.onLayout}
          pointerEvents={Platform.OS === 'ios' ? '' : 'box-none'}>
          <Defs>
            {range(segments).map(i => {
              const {fromX, fromY, toX, toY} = this.calculateCircularArc(
                i,
                segments,
                radius,
                value,
                this.state.angleLength[index],
              );
              return (
                <LinearGradient
                  key={i}
                  id={this.getGradientId(i)}
                  x1={fromX.toFixed(2)}
                  y1={fromY.toFixed(2)}
                  x2={toX.toFixed(2)}
                  y2={toY.toFixed(2)}>
                  <Stop stopColor={colors[index] ? colors[index] : '#ff0000'} />
                </LinearGradient>
              );
            })}
          </Defs>

          {/* Circular Progress */}
          <G
            transform={{
              translate: `${(3 * strokeWidth) / 2 + radius}, ${(3 *
                strokeWidth) /
                2 +
                radius}`,
            }}>
            {range(segments).map(i => {
              const {fromX, fromY, toX, toY} = this.calculateCircularArc(
                i,
                segments,
                radius,
                value,
                this.state.angleLength[index],
              );
              const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(
                2,
              )} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(
                2,
              )}`;
              return (
                <Path
                  d={d}
                  key={i}
                  strokeWidth={strokeWidth}
                  stroke={`url(#${this.getGradientId(i)})`}
                  fill="transparent"
                />
              );
            })}

            {/*
              Progress Icon
              dividerComponent will be render if the length of the dividerComponent is greater than 1 and less than or equal to 4
              since our dividerComponent will render only angle is greater than or equal to PI/2
              */}
            {dividerComponent.length >= 1 &&
              this.state.angleLength[index] >=
                this.minimumAngleLengthToShowDividerComponent &&
              this.renderDividerComponent(index)}

            {/* Start Icon */}
            {this.state.startAngle.length > 1 && (
              <G
                fill={'transparent'}
                transform={{translate: `${start.fromX}, ${start.fromY}`}}
                {...PanResponder.create({
                  onMoveShouldSetPanResponder: (evt, gestureState) => true,
                  onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
                    true,
                  onPanResponderGrant: (evt, gestureState) => {
                    if (onPanResponderGrant) {
                      onPanResponderGrant();
                    }
                    this.setCircleCenter();
                  },
                  onPanResponderRelease: () => {
                    if (onPanResponderRelease) {
                      onPanResponderRelease();
                    }
                  },
                  onPanResponderMove: (evt, {moveX, moveY}) => {
                    //if startAngle is 1 or less, then pan responder would not apply.
                    //Pan responder won't apply for first index item also
                    if (
                      this.state.startAngle.length <= 1 ||
                      index === 0 ||
                      this.isPieChartComponentType
                    ) {
                      return;
                    }
                    const {circleCenterX, circleCenterY} = this.state;
                    const currentAngleStop =
                      (value + this.state.angleLength[index]) % (2 * Math.PI);
                    let newAngle =
                      Math.atan2(moveY - circleCenterY, moveX - circleCenterX) +
                      Math.PI / 2;
                    let newAngleLength = currentAngleStop - newAngle;
                    if (newAngle < 0) {
                      newAngle += 2 * Math.PI;
                    }
                    if (newAngleLength < 0) {
                      newAngleLength += 2 * Math.PI;
                    }
                    let startAngle = [...this.state.startAngle],
                      angleLength = [...this.state.angleLength],
                      angleToUpdate = 0;
                    const indexToUpdate =
                      index === 0
                        ? this.state.startAngle.length - 1
                        : index - 1;
                    if (newAngleLength >= angleLength[index]) {
                      const length =
                        (newAngleLength % (2 * Math.PI)) - angleLength[index];
                      //Checking the updated angle, if it is less than minimum stop angle, we will not update it
                      if (
                        angleLength[indexToUpdate] - length <
                        this.minimumStopAngleLength
                      ) {
                        return;
                      }
                      angleToUpdate = angleLength[indexToUpdate] - length;
                    } else {
                      const length =
                        angleLength[index] - (newAngleLength % (2 * Math.PI));
                      //Checking the updated angle, if it is less than minimum stop angle, we will not update it
                      if (
                        newAngleLength % (2 * Math.PI) <
                        this.minimumStopAngleLength
                      ) {
                        return;
                      }
                      angleToUpdate = angleLength[indexToUpdate] + length;
                    }
                    this.props.values[indexToUpdate] =
                      this.props.values[indexToUpdate] *
                      (angleToUpdate / angleLength[indexToUpdate]);
                    angleLength[indexToUpdate] = angleToUpdate;
                    startAngle[index] = newAngle;
                    angleToUpdate = newAngleLength % (2 * Math.PI);
                    this.props.values[index] =
                      this.props.values[index] *
                      (angleToUpdate / angleLength[index]);
                    angleLength[index] = angleToUpdate;

                    this.setState(
                      {
                        startAngle,
                        angleLength,
                      },
                      () => {
                        onUpdate(this.props.values);
                      },
                    );
                  },
                }).panHandlers}>
                {index === 0
                  ? //Hide the slide divider if the hideSlideDividerType is true or component type is pie_chart
                    !(hideSlideDividerType || this.isPieChartComponentType) && (
                      <Rect
                        y={-(strokeWidth + 10) / 2}
                        x={0}
                        width={0}
                        rotation={
                          180 *
                          ((this.state.startAngle[index] % Math.PI) / Math.PI)
                        }
                        height={strokeWidth + 10}
                        stroke={separatorColor}
                        strokeWidth={DIVIDER_BAR_WIDTH_INDEX1}
                        fill={separatorColor}
                      />
                    )
                  : !(hideSlideDividerType || this.isPieChartComponentType) &&
                    this.renderSlideDivider(index)}
                {//Hide the divider dotted lines if the strokeWidth is greater than radius
                strokeWidth <= radius && (
                  <Line
                    stroke="grey"
                    strokeDasharray="5, 5"
                    x1={0}
                    y1={0}
                    x2={0}
                    rotation={
                      180 * ((this.state.startAngle[index] % Math.PI) / Math.PI)
                    }
                    y2={value >= Math.PI ? -radius : radius}
                  />
                )}
              </G>
            )}
          </G>
        </Svg>,
      );
    });
    return slider;
  }

  renderBorderCircle() {
    const {strokeWidth, borderWidth, radius, borderColor} = this.props;
    return (
      <Svg
        style={{
          position: 'absolute',
          width: this.containerWidth,
          height: this.containerWidth,
        }}
        key={'outer-circle'}>
        <G
          transform={{
            translate: `${(3 * strokeWidth) / 2 + radius}, ${(3 * strokeWidth) /
              2 +
              radius}`,
          }}>
          <Circle
            r={radius + strokeWidth / 2}
            strokeWidth={borderWidth}
            fill="transparent"
            stroke={borderColor}
          />
          <Circle
            r={radius - strokeWidth / 2}
            strokeWidth={borderWidth}
            fill="transparent"
            stroke={borderColor}
          />
        </G>
      </Svg>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: this.containerWidth,
          height: this.containerWidth,
        }}>
        {this.props.borderColor.length > 0 && this.renderBorderCircle()}
        {this.renderSlider()}
      </View>
    );
  }
}
