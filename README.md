# Start the installation 
### iOS，Android
###  Use to another third party - react-native-swRefresh
```
npm install react-native-scrollview-updown --save

```

# Document
```
HomeIndex.defaultProps = {
  clickDetailsViewStyle: {},// Android OS this is 'oneScrollView' bottom custom View style
  clickDetailsTitle: '点击查看图文详情',// Android OS this is 'oneScrollView' custom bottom Title
  oneScrollBottomView: null,//This is 'oneScrollView' bottom custom View
  firstListViewCell: null,//This is 'oneListView' custom renderRow,this is style height need greater than or equal to screen hight
  secondListViewCell: null,//This is 'twoListView' custom renderRow
  startTime: 800,//_onLoadMore Animated time 
  listRefershStartTime: 800,//_onListRefersh Animated time
};
```

# Demo
```
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {HomeIndex} from 'react-native-scrollview-updown'
export default class swipeUpDownScrollView extends Component {
  firstListViewCell(){
    return <View style={{backgroundColor:'red',width:350,height:700}}/>
  }

  render() {
    return (
      <View style={styles.container}>
       <HomeIndex 
        firstListViewCell = {this.firstListViewCell()}
        clickDetailsViewStyle = {{backgroundColor:'cyan'}}
       />
      </View>
    );
  }
}
```

#### ios

![image](https://github.com/CJELLYS/image/blob/master/12.gif?raw=true)

----
#### android 

![image](https://github.com/CJELLYS/image/blob/master/23.gif?raw=true)

----



