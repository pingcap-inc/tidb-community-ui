import React, {FC} from "react";

declare module "*.svg" {
  import { FC } from 'react'
  const Icon: FC
  export default Icon
}

// declare module "*.svg" {
//   const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//   export default content;
// }

declare module "*.png"
