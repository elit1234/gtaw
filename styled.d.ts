// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background?: string;
      altBackground?: string;
      text?: string;
      altText?: string;
      activeBackground?: string;
    };
    addClass?: any;
    shrink?: any;
  }
}
