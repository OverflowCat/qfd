import { House } from "./components/house/house";
import { Logo } from "./components/logo/logo";

export default () => {
  const defaultProps = {
    技术手段: ["低电耗", "自动聚焦", "大容量电池", "外壳"],
    用户需求: ["质量轻", "方便使用", "容易握持", "1500万像素"],
    竞争者评价分制: 5,
  };
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Logo />
        <House {...defaultProps} />
      </body>
    </>
  );
};
