import { component$ } from "@builder.io/qwik";
import "./house.css";
interface ItemProps {
  技术手段: string[];
  用户需求: string[];
  竞争者评价分制: number;
}

export const House = component$((props: ItemProps) => {
  return (
    <table>
      <tbody>
        <tr class="header-row">
          <td rowSpan={2}>用户需求</td>
          <td rowSpan={2}>权重</td>
          <td colSpan={4}>技术手段</td>
          <td colSpan={5}>
            竞争者评价（{props.竞争者评价分制.toLocaleString()}分制）
          </td>
        </tr>
        <tr class="header-row">
          {props.技术手段.map((item, i) => (
            <td key={i}>{item}</td>
          ))}
          {Array(props.竞争者评价分制)
            .fill(0)
            .map((_, i) => (
              <td key={i}>{i + 1}</td>
            ))}
        </tr>

        <tr>
          <td rowSpan={4}>技术手段</td>
          <td>质量轻</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>方便使用</td>
          <td></td>
          <td></td> <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>容易握持</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td> <td></td>
          <td></td>
        </tr>
        <tr>
          <td>&gt;1500万像素</td>
          <td></td>
          <td></td>
          <td></td> <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>本企业技术指标值</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td rowSpan={7} colSpan={5}></td>
        </tr>
        <tr>
          <td rowSpan={5}>技术评估（五分制）</td>
          <td>5</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td colSpan={2} class="title-row">
            产品目标
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
});
