/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import CircularMultipleSlider from 'react-native-circular-multiple-slider';

const DIVIDER_COMPONENT_SIZE = 40;
const PERCENTAGE_TEXT = '%';
const REACT_IMAGE = require('./resource/react.png');
const ANGULAR_IMAGE = require('./resource/angular.png');
const SWIFT_IMAGE = require('./resource/swift.png');
const ANDROID_IMAGE = require('./resource/android.png');
const DIVIDER_IMAGE = require('./resource/divider_icon.png');

export default class Sample extends React.Component {
  state = {
    value: [5, 5, 5, 5],
  };

  onUpdate = value => {
    this.setState({
      value,
    });
  };

  getDividerComponentImage(image) {
    return (
      <Image
        style={{
          width: DIVIDER_COMPONENT_SIZE,
          height: DIVIDER_COMPONENT_SIZE,
        }}
        source={image}
      />
    );
  }

  getDividerComponentText(text) {
    return (
      <Text
        style={[
          {
            width: DIVIDER_COMPONENT_SIZE,
            height: DIVIDER_COMPONENT_SIZE,
          },
          styles.text,
        ]}>
        {text}
      </Text>
    );
  }

  renderSliderWithCircleDivider() {
    return (
      <View style={{ height: 500, width: '100%' }}>
        <Text style={styles.title}>
          {'Multiple Circular Slider  \nCircle Divider'}
        </Text>
        <CircularMultipleSlider
          componentType={'slider'} //Default type is slider
          values={this.state.value}
          colors={['#9BBFE0', '#E8A09A', '#FBE29F', '#C6D68F']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentImage(REACT_IMAGE),
            this.getDividerComponentImage(ANGULAR_IMAGE),
            this.getDividerComponentImage(SWIFT_IMAGE),
            this.getDividerComponentImage(ANDROID_IMAGE),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'circle'}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={30}
          radius={160}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderSliderWithSquareDivider() {
    return (
      <View style={{ height: 500, width: '100%' }}>
        <Text style={styles.title}>
          {'Multiple Circular Slider \nwith \nSquare Divider'}
        </Text>
        <CircularMultipleSlider
          componentType={'slider'} //Default type is slider
          values={this.state.value}
          colors={['#9BBFE0', '#E8A09A', '#FBE29F', '#C6D68F']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentImage(REACT_IMAGE),
            this.getDividerComponentImage(ANGULAR_IMAGE),
            this.getDividerComponentImage(SWIFT_IMAGE),
            this.getDividerComponentImage(ANDROID_IMAGE),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'square'}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={30}
          radius={160}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderSliderWithBarDivider() {
    return (
      <View style={{ height: 500, width: '100%' }}>
        <Text style={styles.title}>
          {'Multiple Circular Slider \nwith \nBar Divider'}
        </Text>
        <CircularMultipleSlider
          componentType={'slider'} //Default type is slider
          values={this.state.value}
          colors={['#9BBFE0', '#E8A09A', '#FBE29F', '#C6D68F']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentImage(REACT_IMAGE),
            this.getDividerComponentImage(ANGULAR_IMAGE),
            this.getDividerComponentImage(SWIFT_IMAGE),
            this.getDividerComponentImage(ANDROID_IMAGE),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'bar'}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={30}
          radius={160}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderSliderWithIconDivider() {
    return (
      <View style={{ height: 500, width: '100%' }}>
        <Text style={styles.title}>
          {'Multiple Circular Slider \nwith \nDivider Icon'}
        </Text>
        <CircularMultipleSlider
          componentType={'slider'} //Default type is slider
          values={this.state.value}
          colors={['#9BBFE0', '#E8A09A', '#FBE29F', '#C6D68F']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentImage(REACT_IMAGE),
            this.getDividerComponentImage(ANGULAR_IMAGE),
            this.getDividerComponentImage(SWIFT_IMAGE),
            this.getDividerComponentImage(ANDROID_IMAGE),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'icon'}
          slideDividerIcon={DIVIDER_IMAGE}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={30}
          radius={160}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderSliderWithTextDividerComponent() {
    return (
      <View style={{ height: 500, width: '100%' }}>
        <Text style={styles.title}>
          {'Multiple Circular Slider \nwith \nText Divider Component'}
        </Text>
        <CircularMultipleSlider
          componentType={'slider'} //Default type is slider
          values={this.state.value}
          colors={['#9BBFE0', '#E8A09A', '#FBE29F', '#C6D68F']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentText(
              Math.round(this.state.value[0]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[1]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[2]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[3]) + PERCENTAGE_TEXT,
            ),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'icon'}
          slideDividerIcon={DIVIDER_IMAGE}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={30}
          radius={160}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderSliderWithoutDivider() {
    return (
      <View style={{ height: 500, width: '100%' }}>
        <Text style={styles.title}>
          {'Multiple Circular Slider \nwithout Divider'}
        </Text>
        <CircularMultipleSlider
          componentType={'slider'} //Default type is slider
          values={this.state.value}
          colors={['#9BBFE0', '#E8A09A', '#FBE29F', '#C6D68F']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentText(
              Math.round(this.state.value[0]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[1]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[2]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[3]) + PERCENTAGE_TEXT,
            ),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'circle'}
          hideSlideDividerType={true}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={30}
          radius={160}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderPieChartWithTextDividerComponent() {
    return (
      <View style={{ height: 500, width: 640 }}>
        <Text style={styles.title}>
          {'Circular Pie-Chart \nwith \nText Divider Component'}
        </Text>
        <CircularMultipleSlider
          //If component type is pie chart then the divider will be hide automatically.
          componentType={'pie_chart'} //Default type is slider
          values={this.state.value}
          colors={['#9BBFE0', '#E8A09A', '#FBE29F', '#C6D68F']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentText(
              Math.round(this.state.value[0]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[1]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[2]) + PERCENTAGE_TEXT,
            ),
            this.getDividerComponentText(
              Math.round(this.state.value[3]) + PERCENTAGE_TEXT,
            ),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'circle'}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={160}
          radius={80}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderPieChartWithIconDividerComponent() {
    return (
      <View style={{ height: 500, width: 640 }}>
        <Text style={styles.title}>
          {'Circular Pie-Chart \nwith \nDivider Icon Component'}
        </Text>
        <CircularMultipleSlider
          //If component type is pie chart then the divider will be hide automatically.
          componentType={'pie_chart'} //Default type is slider
          values={this.state.value}
          colors={['#FBE29F', '#C6D68F', '#9BBFE0', '#E8A09A']}
          onUpdate={this.onUpdate}
          dividerComponent={[
            this.getDividerComponentImage(REACT_IMAGE),
            this.getDividerComponentImage(ANGULAR_IMAGE),
            this.getDividerComponentImage(SWIFT_IMAGE),
            this.getDividerComponentImage(ANDROID_IMAGE),
          ]}
          dividerComponentSize={DIVIDER_COMPONENT_SIZE}
          slideDividerType={'circle'}
          borderColor={'#0088a0'}
          borderWidth={3}
          strokeWidth={160}
          radius={80}
          separatorColor="#171717"
          minimumStopValue={0.5}
        />
      </View>
    );
  }

  renderTextContainer() {
    return (
      <View>
        <View style={styles.rowStyle}>
          <Text style={[styles.description, { color: '#2D87BB' }]}>
            {'React - '}
          </Text>
          <Text style={[styles.value, { color: '#2D87BB' }]}>
            {Math.round(this.state.value[0]) + PERCENTAGE_TEXT}
          </Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={[styles.description, { color: '#EC6B56' }]}>
            {'Angular - '}
          </Text>
          <Text style={[styles.value, { color: '#EC6B56' }]}>
            {Math.round(this.state.value[1]) + PERCENTAGE_TEXT}
          </Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={[styles.description, { color: '#FFC154' }]}>
            {'Swift - '}
          </Text>
          <Text style={[styles.value, { color: '#FFC154' }]}>
            {Math.round(this.state.value[2]) + PERCENTAGE_TEXT}
          </Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={[styles.description, { color: '#47B39C' }]}>
            {'Android - '}
          </Text>
          <Text style={[styles.value, { color: '#47B39C' }]}>
            {Math.round(this.state.value[3]) + PERCENTAGE_TEXT}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSliderWithCircleDivider()}
        {/* {this.renderSliderWithSquareDivider()} */}
        {/* {this.renderSliderWithBarDivider()} */}
        {/* {this.renderSliderWithIconDivider()} */}
        {/* {this.renderSliderWithTextDividerComponent()} */}
        {/* {this.renderSliderWithoutDivider()} */}
        {/* {this.renderPieChartWithTextDividerComponent()} */}
        {/* {this.renderPieChartWithIconDividerComponent()} */}
        {this.renderTextContainer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    padding: 8,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 32,
    color: 'white',
    backgroundColor: '#9963e7',
    marginTop: -50,
    marginBottom: 50,
    paddingVertical: 10,
  },
  description: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: 'normal',
    lineHeight: 25,
  },
  value: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 25,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2B0B3F',
  },
});
