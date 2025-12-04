import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const ProfileIcon = ({ color = "currentColor", size = 24, focused }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
      stroke={focused ? color : "#D0CFCA"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="11"
      r="4"
      stroke={focused ? color : "#D0CFCA"}
      strokeWidth="2"
    />
  </Svg>
);
export default ProfileIcon;