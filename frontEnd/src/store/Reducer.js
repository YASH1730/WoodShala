import { Auth, DarkMode, Notify, SideTabs, OpenBox } from './Types'
  
  export const globalSwitch = (state, action) => {
    switch (action.type) {
      case Auth:
        console.log(action.payload)
        return { ...state, Auth: action.payload  };
      // case LogBox:
        // return { ...state, LogBox: { ...action.payload } }
      case Notify:
        return { ...state, Notify: { ...action.payload } }
      case DarkMode:
        console.log(action.payload)
        return { ...state, DarkMode: { ...action.payload } }
      case SideTabs:
        return { ...state, SideTabs: { ...action.payload } }
      case OpenBox:
        return { ...state, OpenBox: { ...action.payload } }
        default:
        return state;
    }
  }