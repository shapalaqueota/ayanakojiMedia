declare module '*.mp4' {
    const src: string;
    export default src;
  }

  declare module '*.svg' {
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }
  
  