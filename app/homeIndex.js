/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Animated,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

import { descInfo } from '../app/Color.js'
import {
  SwRefreshScrollView,
  SwRefreshListView,
  RefreshStatus, //刷新状态 用于自定义
  LoadMoreStatus //上拉加载状态 用于自定义
} from 'react-native-swRefresh'

export class HomeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      fadeAnimAnimated: new Animated.Value(0),
    }
  }

  firstListViewCell() {
    if (this.props.firstListViewCell === null) {
      return <View style={{ width: descInfo.width, height: descInfo.height }} />
    } else {
      return this.props.firstListViewCell
    };
  }

  oneScrollViewBottomView() {
    if (this.props.oneScrollBottomView === null) {
      return <TouchableOpacity onPress={() => this.clickDetails()} activeOpacity={1}>
        <View style={[styles.graphicdetails, this.props.clickDetailsViewStyle]}>
          <Text style={{ color: '#999999', fontSize: 14 }}>{this.props.clickDetailsTitle}</Text>
        </View>
      </TouchableOpacity>
    } else {
      return this.props.firstListViewCell
    };
  }

  swRefreshListView(ds) {
    if (Platform.OS === 'ios') {
      return <SwRefreshListView ref='oneListView'
        dataSource={ds.cloneWithRows(['row1'])}
        renderRow={(rowData) => this.firstListViewCell()}
        onLoadMore={this._onLoadMore.bind(this)}
      />
    } else {
      return <ScrollView ref='oneScrollView'>
        {this.firstListViewCell()}
        {this.oneScrollViewBottomView()}
      </ScrollView>
    }
  }

  downCellView() {
    if (this.props.secondListViewCell === null) {
      return <View style={{ width: descInfo.width, height: descInfo.height }} />
    } else {
      return this.props.secondListViewCell
    };
  }

  _onLoadMore(end) {
    end()
    Animated.timing(
      this.state.fadeAnimAnimated,
      {
        toValue: -descInfo.height,
        duration: this.props.startTimer,
      },
    ).start();
  }

  clickDetails() {
    Animated.timing(
      this.state.fadeAnimAnimated,
      {
        toValue: -descInfo.height,
        duration: this.props.startTime,
      },
    ).start();
  }

  _onListRefersh(end) {
    end()
    Animated.timing(
      this.state.fadeAnimAnimated,
      {
        toValue: -0,
        duration: this.props.listRefershStartTime,
      },
    ).start();
  }


  render() {
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (<View>
      <Animated.View   // Special animatable View
        style={{ marginTop: this.state.fadeAnimAnimated, width: descInfo.width, height: descInfo.height-(Platform.OS === 'ios'?0:20)}}>
        {this.swRefreshListView(ds)}
      </Animated.View>
      <View style={{ width: descInfo.width, height: descInfo.height }}>
        <SwRefreshListView ref='twoListView'
          dataSource={ds.cloneWithRows(['row1'])}
          renderRow={() => this.downCellView()}
          onRefresh={this._onListRefersh.bind(this)}
          isShowLoadMore={false}
          isShowRefresh={false}
          removeClippedSubviews={false}
          enableEmptySections={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
    );
  }
}

HomeIndex.defaultProps = {
  clickDetailsViewStyle: {},// Android OS this is 'oneScrollView' bottom custom View style
  clickDetailsTitle: '点击查看图文详情',//// Android OS this is 'oneScrollView' custom bottom Title
  oneScrollBottomView: null,//This is 'oneScrollView' bottom custom View
  firstListViewCell: null,//This is 'oneListView' custom renderRow,this is style height need greater than or equal to screen hight
  secondListViewCell: null,//This is 'twoListView' custom renderRow
  startTime: 800,//_onLoadMore Animated time 
  listRefershStartTime: 800,//_onListRefersh Animated time

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  graphicdetails: {
    backgroundColor: 'white',
    width: descInfo.width,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

