import { component$, useStore } from "@builder.io/qwik";
import { House } from "./components/house/house";

function toRateData(data: string[][]) {
  return data.map((row) => {
    return row.map((item) =>
      item
        .split("")
        .filter(Boolean)
        .reduce(
          (p, c) => {
            p[c] = true;
            return p;
          },
          {
            A: false,
            B: false,
            X: false,
          } as { [key: string]: boolean }
        )
    );
  });
}

const 竞争者评价 = toRateData([
  ["B", "X", "", "A", ""],
  ["XA", "", "", "B", ""],
  ["", "", "A", "B", "X"],
  ["", "X", "", "AB", ""],
]);

console.log(竞争者评价);

export default component$(() => {
  const data = useStore({
    技术手段: ["低电耗", "自动聚焦", "大容量电池", "外壳", "折叠屏"],
    技术相关性: [[1, 0, 0, 0], [0, 3, 0], [0, 5], [3]],
    关系矩阵: [
      [1, 1, 0, 0, 3],
      [0, 5, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 3, 1, 0],
      [0, 0, 0, 0, 1],
    ],
    程度符号: [" ", "◎", false, "⊙", false, "▲"],
    用户需求: ["质量轻", "方便使用", "容易握持", "1500万像素"],
    用户需求权重: [2, 3, 1, 4],
    竞争者评价分制: 5,
    竞争者评价,
  });

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <House data={data} />
      </body>
    </>
  );
});
