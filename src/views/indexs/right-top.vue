<template>
  <div class="tongji">
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      size="mini"
      style="margin-left: 65px;margin-bottom: 20px;"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="changeDate"
    >
    </el-date-picker>
    <Echart
      id="rightTop"
      :options="option"
      class="right_top_inner"
      v-if="pageflag"
      ref="charts"
    />

    <Reacquire v-else @onclick="getData" style="line-height: 200px">
      重新获取
    </Reacquire>
    
  </div>
</template>

<script>
import { currentGET } from "api/modules";
import { graphic } from "echarts";
export default {
  data() {
    return {
      option: {},
      pageflag: false,
      timer: null,
      xData: [],
      yData: [],
      date:[],
      queryParams:{

      }
    };
  },
  created() {},

  mounted() {
    this.getData();
  },
  beforeDestroy() {
    this.clearData();
  },
  methods: {
    // 选择时间
    changeDate(e){
      this.xData = [],
      this.yData = [],
      this.queryParams.start_time = e[0]
      this.queryParams.end_time = e[1]
      this.getData(true)
      console.log(e);
    },
    clearData() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    getData(flag) {
      this.pageflag = true;
      currentGET(this.queryParams).then((res) => {
        if (!this.timer) {
          // console.log("次数", res);
        }
        if (res) {
          this.countUserNumData = res.data;
          this.$nextTick(() => {
            this.xData = [...this.xData, ...res.datelist];
            this.yData = [...this.yData, ...res.datalist];
            this.init(this.xData, this.yData), this.switper();
          });
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });
    },
    //轮询
    switper() {
      if (this.timer) {
        return;
      }
      let looper = (a) => {
        this.getData();
      };
      this.timer = setInterval(
        looper,
        this.$store.state.setting.echartsAutoTime
      );
      let myChart = this.$refs.charts.chart;
      myChart.on("mouseover", (params) => {
        console.log("mouseover", params);
        this.clearData();
      });
      myChart.on("mouseout", (params) => {
        this.timer = setInterval(
          looper,
          this.$store.state.setting.echartsAutoTime
        );
      });
    },
    // 计算开始值
    startValueFun() {
      return this.xData.length > 10 ? this.xData.length - 10 : 0;
    },
    // 计算结束值
    endValueFun() {
      return this.xData.length;
    },
    init(xData, yData) {
      this.option = {
        xAxis: {
          type: "category",
          data: xData,
          
          boundaryGap: false, // 不留白，从原点开始
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            // show:false,
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
            // rotate: 30,  //设置角度旋转
          },
        },
        yAxis: {
          name: "单位（吨）",
          type: "value",
          nameTextStyle: {
            color: "#aaa",
            nameLocation: "start",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
            
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          formatter:(params)=> {
              let str = "";
                str += `<div style="display: flex;justify-content: space-between;width:auto;align-items: center"><p style="width: 5px;height:5px;margin-right:.08rem;border-radius: 50%;
                }">
                  <p/><p>
                    时间：${
                    params[0].axisValue
                  }
                  </br>
                  重量：
                  ${
                   params[0].data
                  }
                  吨
                  </p>
                  </div>`;
                return str;
          }
        },
        grid: {
          //布局
          show: true,
          left: "40px",
          right: "60px",
          bottom: "20px",
          top: "28px",
          containLabel: true,
          borderColor: "#1F63A3",
        },
        dataZoom: [
          {
            show: false,
            type: "slider",
            handleSize: 32, // 两边的按钮大小
            startValue: this.startValueFun(), // 重点在这   -- 开始的值
            endValue: this.endValueFun(), // 重点在这   -- 结束的值
          },
          {
            type: "inside",
          },
        ],

        series: [
          {
            data: yData,
            type: "line",
            smooth: true,
            // symbol: "none", //去除点
            name: "磅值",
            color: "rgba(9,202,243,.7)",
            areaStyle: {
              //右，下，左，上
              color: new graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(9,202,243,.7)",
                  },
                  {
                    offset: 1,
                    color: "rgba(9,202,243,.0)",
                  },
                ],
                false
              ),
            },
            markPoint: {
              // data: [
              //   {
              //     name: "最大值",
              //     type: "max",
              //     valueDim: "y",
              //     symbol: "rect",
              //     symbolSize: [60, 26],
              //     symbolOffset: [0, -20],
              //     itemStyle: {
              //       color: "rgba(0,0,0,0)",
              //     },
              //     label: {
              //       color: "#09CAF3",
              //       backgroundColor: "rgba(9,202,243,0.1)",

              //       borderRadius: 6,
              //       borderColor: "rgba(9,202,243,.5)",
              //       padding: [7, 14],
              //       formatter: "最大值：{c}",
              //       borderWidth: 0.5,
              //     },
              //   },
              //   {
              //     name: "最小值",
              //     type: "min",
              //     valueDim: "y",
              //     symbol: "rect",
              //     symbolSize: [60, 26],
              //     symbolOffset: [0, -20],
              //     itemStyle: {
              //       color: "rgba(0,0,0,0)",
              //     },
              //     label: {
              //       color: "#FC9010",
              //       backgroundColor: "rgba(252,144,16,0.1)",
              //       borderRadius: 6,
              //       padding: [7, 14],
              //       borderWidth: 0.5,
              //       borderColor: "rgba(252,144,16,.5)",
              //       formatter: "最小值：{c}",
              //     },
              //   },
              // ],
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.right_top_inner {
  margin-top: -8px;
}
.tongji{
  width: 100%;
  height: 100%;
}
::v-deep .el-input__inner {
      background-color: transparent !important;
      border-color:#01aaff;
      // box-shadow: 1px 1px 5px 1px  RGB(128,255,255,0.8) inset;
      .el-range-input{
        background-color: transparent !important;
        color: #fff !important;
      }
      .el-range-separator{
        color: #fff !important;
      }
    }
</style>
