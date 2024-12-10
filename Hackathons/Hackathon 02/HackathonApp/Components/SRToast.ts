import Toast from "react-native-toast-message";

export const SRToast = (heading1:string, heading2:string, type?:string, position?:any) => {
    Toast.show({
      type: type || 'success',
      text1: heading1 || "Hello",
      text2: heading2 || 'This is some something 👋',
      position: position || 'bottom'
    });
  }