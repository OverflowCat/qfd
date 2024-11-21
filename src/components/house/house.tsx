import { $, component$, useComputed$ } from "@builder.io/qwik";
import "./house.css";
interface Data {
  技术手段: string[];
  用户需求: string[];
  用户需求权重: number[];
  竞争者评价分制: number;
  竞争者评价: {
    [key: string]: boolean;
  }[][];
  技术评估: {
    [key: string]: boolean;
  }[][];
  技术相关性: number[][];
  程度符号: Array<string | boolean>;
  关系矩阵: Array<Array<number>>;
}

const Rater = component$(
  (props: {
    data: {
      [key: string]: boolean;
    };
    _key: string;
    handler: any;
  }) => {
    const { data, _key, handler } = props;
    return (
      <td key={_key}>
        {Object.entries(data).map(([firm, value], i) => (
          <>
            <input
              key={"rater-" + _key + "-" + i + "-" + firm}
              id={"c-" + _key + "-" + i + "-" + firm}
              type="checkbox"
              name={firm}
              checked={value}
              onChange$={() => handler(firm, !value)}
            ></input>
            <label
              for={"c-" + _key + "-" + i + "-" + firm}
              id={"label-" + _key + "-" + i + "-" + firm}
            >
              {firm}
            </label>
          </>
        ))}
      </td>
    );
  }
);

export const House = component$((props: { data: Data }) => {
  const data = props.data;
  function toDegree(lv: number) {
    if (0 < lv && lv < data.程度符号.length && data.程度符号[lv] !== false) {
      return data.程度符号[lv];
    }
    return null;
  }
  const changeDegree = $(async (lv: number) => {
    if (lv >= data.程度符号.length - 1) return 0;
    while (data.程度符号[++lv] === false)
      if (lv >= data.程度符号.length - 1) return 0;
    return lv;
  });
  if (data.竞争者评价.length !== data.用户需求.length)
    throw new Error("竞争者评价和用户需求必须匹配");
  if (!data.竞争者评价?.length) throw new Error("用户需求数量必须大于 0");
  if (data.竞争者评价[0].length !== data.技术手段.length)
    throw new Error("竞争者评价和技术手段长度必须匹配");
  if (data.技术相关性.length !== data.技术手段.length - 1)
    throw new Error("竞争者评价和技术手段长度必须匹配");
  data.技术相关性.forEach((ele, i) => {
    if (ele?.length !== data.技术手段.length - 1 - i)
      throw new Error("竞争者评价和技术手段长度必须呈递减匹配");
  });

  const 本企业技术指标值 = useComputed$(() => {
    return data.技术手段.map((item, 技术) => {
      let sum = 0;
      for (let 需求 = 0; 需求 < data.用户需求.length; 需求++) {
        const element = data.关系矩阵[需求][技术];
        if (element !== undefined) sum += element * data.用户需求权重[需求];
      }
      return sum;
    });
  });

  return (
    <div class="house">
      <table class="f">
        <tbody>
          {data.技术相关性.map((item, i) => (
            <tr key={"rooftop-" + i}>
              {item.map((item, j) => (
                <td key={"rooftop-" + i + "-" + j}>
                  <button
                    onClick$={async () =>
                      (data.技术相关性[i][j] = await changeDegree(
                        data.技术相关性[i][j]
                      ))
                    }
                  >
                    <div>{toDegree(item)}</div>
                  </button>
                </td>
              ))}
              <td class="disabled"></td>
            </tr>
          ))}
          <tr class="disabled">
            <td></td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr class="header-row">
            <td rowSpan={2} class="wide">
              用户需求
            </td>
            <td rowSpan={2}>权重</td>
            <td colSpan={data.技术手段.length}>技术手段</td>
            <td colSpan={5}>
              竞争者评价（{data.竞争者评价分制.toLocaleString("zh-CN")}分制）
            </td>
          </tr>
          <tr class="header-row">
            {data.技术手段.map((item, i) => (
              <td class="技术手段" key={"tech-" + i}>
                {item}
              </td>
            ))}
            {Array(data.竞争者评价分制)
              .fill(0)
              .map((_, i) => (
                <td class="竞争者评价" key={"竞争者评价-" + i}>
                  {i + 1}
                </td>
              ))}
          </tr>
          {data.用户需求.map((item, i) => (
            <tr key={"user-" + i} class="e">
              <td>{item}</td>
              <td>{data.用户需求权重[i]}</td>
              {/* <td>xxx</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td> */}
              {data.关系矩阵[i].map((item, j) => (
                <td key={"E-" + i + "-" + j}>
                  <button
                    onClick$={async () =>
                      (data.关系矩阵[i][j] = await changeDegree(
                        data.关系矩阵[i][j]
                      ))
                    }
                  >
                    {toDegree(item)}
                  </button>
                </td>
              ))}
              {data.竞争者评价[i].map((item, j) => (
                <Rater
                  key={"rater-" + i + "-" + j}
                  _key={"competitor-" + i + "-" + j}
                  data={data.竞争者评价[i][j]}
                  handler={$((firm: string, check: boolean) => {
                    // 确保当前行其余所有数据都为 false
                    if (check)
                      for (let k = 0; k < data.竞争者评价[i].length; k++)
                        data.竞争者评价[i][k][firm] = k == j;
                  })}
                ></Rater>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={2}>本企业技术指标值</td>
            {本企业技术指标值.value.map((item, i) => (
              <td key={"index-" + i}>{item}</td>
            ))}
            <td rowSpan={7} colSpan={5} class="na"></td>
          </tr>
          {Array.from({ length: 5 })
            .map((_, i) => 5 - 1 - i)
            .map((技术, i) => (
              <tr key={"tr-eva-" + i}>
                {i === 0 && <td rowSpan={5}>技术评估（五分制）</td>}
                <td>{技术 + 1}</td>
                {data.技术评估.map((row, i) => (
                  <Rater
                    key={"t-rater-" + 技术 + "-" + i}
                    _key={"teva-" + 技术 + "-" + i}
                    data={row[技术]}
                    handler={$((firm: string, check: boolean) => {
                      // 确保当前行其余所有数据都为 false
                      if (check)
                        for (let k = 0; k < data.技术评估[i].length; k++)
                          data.技术评估[i][k][firm] = k == 技术;
                    })}
                  ></Rater>
                ))}
              </tr>
            ))}
          <tr>
            <td colSpan={2} class="title-row">
              产品目标
            </td>
            {data.技术手段.map((item, i) => (
              <td key={"product-" + i}>
                <textarea></textarea>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
});
