<template>
    <div v-if="value" class="select-wrapper">
        <div class="mask" @click="cancelSelect" @touchmove.prevent>
            <div class="address-wrap" @click.stop>
                <div class="tip-header">
                    <span class="cancel-btn" @click="cancelSelect">取消</span>
                    <h3>选择地区</h3>
                    <button :disabled="isDisabled" class="submit-btn" @click="confirm">
                        确定
                    </button>
                </div>
                <div class="address-select">
                    <ul class="show-address-header">
                        <li :class="{ active: isShowProvince }" class="item" @click="tabAddressClick(1)">
                            {{
                          dataObj.provinceName
                            ? dataObj.provinceName
                            : '请选择'
                            }}
                        </li>
                        <li v-show="dataObj.provinceName && rank>1" :class="{ active: isShowCity }" class="item" @click="tabAddressClick(2)">
                            {{ dataObj.cityName ? dataObj.cityName : '请选择' }}
                        </li>
                        <li v-show="dataObj.cityName && rank>2" :class="{ active: isShowCounty }" class="item" @click="tabAddressClick(3)">
                            {{
                          dataObj.countyName ? dataObj.countyName : '请选择'
                            }}
                        </li>
                        <li v-show="dataObj.countyName && rank>3" :class="{ active: isShowTown }" class="item" @click="tabAddressClick(4)">
                            {{ dataObj.townName ? dataObj.townName : '请选择' }}
                        </li>
                    </ul>
                    <div class="address-content" @touchmove.stop>
                        <ul v-show="isShowProvince" id="province">
                            <li v-for="(provinceItem, index) in areaList.provinceList" :key="index" :class="{ active: provinceItem.selected }" @click="provinceSelect(provinceItem, index)">
                                <span>{{ provinceItem.provinceName }}</span>
                                <span v-show="provinceItem.selected">
                                    <img src="./sort-select-icon.png" />
                                </span>
                            </li>
                        </ul>
                        <ul v-show="isShowCity" id="city">
                            <li v-for="(cityItem, index) in areaList.cityList" :key="index" :class="{ active: cityItem.selected }" @click="citySelect(cityItem, index)">
                                <span>{{ cityItem.cityName }}</span>
                                <span v-show="cityItem.selected">
                                    <img src="./sort-select-icon.png" />
                                </span>
                            </li>
                        </ul>
                        <ul v-show="isShowCounty" id="county">
                            <li v-for="(countyItem, index) in areaList.countyList" :key="index" :class="{ active: countyItem.selected }" @click="countySelect(countyItem, index)">
                                <span>{{ countyItem.countyName }}</span>
                                <span v-show="countyItem.selected">
                                    <img src="./sort-select-icon.png" />
                                </span>
                            </li>
                        </ul>
                        <ul v-show="isShowTown" id="town">
                            <li v-for="(townItem, index) in areaList.townList" :key="index" :class="{ active: townItem.selected }" @click="townSelect(townItem, index)">
                                <span>{{ townItem.townName }}</span>
                                <span v-show="townItem.selected">
                                    <img src="./sort-select-icon.png" />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {
    getProvinceList,
    getCityList,
    getCountyList,
    getTownList
  } from '../../request/service'

  export default {
    name: 'WutaoArea',
    data() {
      return {
        areaList: {
          provinceList: [],
          cityList: [],
          countyList: [],
          townList: []
        },
        dataObj: {
          cityId: '',
          cityName: '',
          countyId: '',
          countyName: '',
          patientAddress: '',
          provinceId: '',
          provinceName: '',
          townId: '',
          townName: '',
        },
        isDisabled: true,
        isShowProvince: true,
        isShowCity: false,
        isShowCounty: false,
        isShowTown: false,
      }
    },
    props: {
      value: {
        type: Boolean,
        default: true
      },
      baseUrl: {
        type: String,
        default: 'https://xxx.xxx.com'
      },
      rank: {
        type: Number | String,
        default: 4
      },
    },
    created() {
      localStorage.setItem('baseUrl_v2',this.baseUrl);
      this.getProvinceData();
    },
    methods: {
      async getProvinceData() {
        await getProvinceList().then((res) => {
          if (res.code === '000000') {
            this.areaList.provinceList = res.data.provinceList;
            this.areaList.provinceList.map(a => {
              if (a.provinceId == this.dataObj.provinceId) {
                a.selected = true
              }
            });
          }
        })
      },
      async getCityData(provinceId) {
        await getCityList({
          provinceId: provinceId
        }).then((res) => {
          if (res.code === '000000') {
            this.areaList.cityList = res.data.cityList;
            this.areaList.cityList.map(a => {
              if (a.cityId == this.dataObj.cityId) {
                a.selected = true
              }
            });
          }
        })
      },
      async getCountyData(cityId) {
        await getCountyList({
          cityId: cityId,
        }).then((res) => {
          if (res.code === '000000') {
            this.areaList.countyList = res.data.countyList;
            this.areaList.countyList.map(a => {
              if (a.countyId == this.dataObj.countyId) {
                a.selected = true
              }
            });
          }
        })
      },
      async getTownData(countyId) {
        await getTownList({
          countyId: countyId,
        }).then((res) => {
          if (res.code === '000000') {
            this.areaList.townList = res.data.townList;
            this.areaList.townList.map(a => {
              if (a.townId == this.dataObj.townId) {
                a.selected = true
              }
            });
          }
        })
      },
      //      provinceCallback(provinceId) {
      //        this.getCityData(provinceId);
      //      },
      //      cityCallback(cityId) {
      //        this.getCountyData(cityId);
      //      },
      //      countryCallback(countyId) {
      //        this.getTownData(countyId);
      //      },
      //选择省份的操作，以下从其他业务组件拷贝过来===开始===
      provinceSelect(item, idx) {
        this.dataObj.provinceId = item.provinceId;
        this.dataObj.provinceName = item.provinceName;
        this.dataObj.patientAddress = '';
        this.dataObj.cityId = null;
        this.dataObj.cityName = '';
        this.dataObj.countyId = null;
        this.dataObj.countyName = '';
        this.dataObj.townId = null;
        this.dataObj.townName = '';
        //控制省市县乡数据展示与隐藏
        this.isShowProvince = false;
        this.isShowCounty = false;
        this.isShowTown = false;
        if(this.rank>1){
          this.isShowCity = true;
          this.getCityData(this.dataObj.provinceId);
          this.isDisabled = true;
        }else{
          this.isDisabled = false;
        }
        // 当前选中的样式
        this.areaList.provinceList.map(a => a.selected = false);
        this.areaList.provinceList[idx].selected = true;
      },
      //选择市的操作
      citySelect(item, idx) {
        this.dataObj.cityId = item.cityId;
        this.dataObj.cityName = item.cityName;
        this.dataObj.patientAddress = '';
        this.dataObj.countyId = null;
        this.dataObj.countyName = '';
        this.dataObj.townId = null;
        this.dataObj.townName = '';
        //控制省市县乡数据展示与隐藏
        this.isShowProvince = false;
        this.isShowCity = false;
        this.isShowTown = false;
        if(this.rank>2){
          this.isShowCounty = true;
          this.getCountyData(this.dataObj.cityId);
          this.isDisabled = true;
        }else{
          this.isDisabled = false;
        }
        // 当前选中的样式
        this.areaList.cityList.map(a => a.selected = false);
        this.areaList.cityList[idx].selected = true;
      },
      //选择区/县的操作
      countySelect(item, idx) {
        this.dataObj.countyId = item.countyId;
        this.dataObj.countyName = item.countyName;
        this.dataObj.townId = null;
        this.dataObj.townName = '';
        this.dataObj.patientAddress = '';
        //控制省市县乡数据展示与隐藏
        this.isShowProvince = false;
        this.isShowCity = false;
        this.isShowCounty = false;
        if(this.rank>3){
          this.isShowTown = true;
          this.getTownData(this.dataObj.countyId);
          this.isDisabled = true;
        }else{
          this.isDisabled = false;
        }
        // 当前选中的样式
        this.areaList.countyList.map(a => a.selected = false);
        this.areaList.countyList[idx].selected = true;
      },
      //选择乡镇的操作
      townSelect(item, idx) {
        this.dataObj.townId = item.townId;
        this.dataObj.townName = item.townName;
        this.dataObj.patientAddress = `${this.dataObj.provinceName}${this.dataObj.cityName}${this.dataObj.countyName}${this.dataObj.townName}`;
        // 当前选中的样式
        this.areaList.townList.map(a => a.selected = false);
        this.areaList.townList[idx].selected = true;
        this.isDisabled = false;
      },
      tabAddressClick(tab) {
        if (tab === 1) {
          this.isShowProvince = true;
          this.isShowCity = false;
          this.isShowCounty = false;
          this.isShowTown = false;
        } else if (tab === 2) {
          this.isShowProvince = false;
          this.isShowCity = true;
          this.isShowCounty = false;
          this.isShowTown = false;
        } else if (tab === 3) {
          this.isShowProvince = false;
          this.isShowCity = false;
          this.isShowCounty = true;
          this.isShowTown = false;
        } else if (tab === 4) {
          this.isShowProvince = false;
          this.isShowCity = false;
          this.isShowCounty = false;
          this.isShowTown = true;
        }
      },
      // 从其他业务组件拷贝过来===结束===
      confirm() {
        this.$emit('confirm', this.dataObj);
        this.$emit('input', false);
      },
      cancelSelect() {
        this.$emit('cancel', false);
        this.$emit('input', false);
      },
    }
  }
</script>
<style lang="less">
    .select-wrapper {
        font-family: PingFangSC-Regular;

        .mask {
            position: fixed;
            z-index: 1000;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(55, 56, 57, 0.6);
        }

        .address-wrap {
            position: absolute;
            width: 100%;
            height: 293px;
            background-color: #ffffff;
            box-sizing: border-box;
            bottom: 0;
            left: 0;
            right: 0;

            .tip-header {
                position: relative;
                height: 58px;
                line-height: 58px;
                width: 100%;
                font-size: 17px;
                display: flex;
                justify-content: space-between;
                padding: 0 15px;
                box-sizing: border-box;

                .cancel-btn {
                    color: #999;
                }

                h3 {
                    font-size: 18px;
                    color: #373839;
                    font-weight: 400;
                }

                .submit-btn {
                    font-size: 17px;
                    outline: none;
                    border: 1px solid transparent;
                    background-color: transparent;
                    color: #449284 !important;

                    &:disabled {
                        color: #C7C8C9;
                    }
                }
            }

            .address-select {
                width: 100%;
                height: auto;
                /*height: 196px;*/
                box-sizing: border-box;

                .show-address-header {
                    width: 100%;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: flex;
                    position: relative;
                    padding-bottom: 4px;

                    &:after {
                        content: " ";
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        height: 1px;
                        border-bottom: 1px solid #F0F1F2;
                        color: #F0F1F2;
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        -webkit-transform: scaleY(.5);
                        transform: scaleY(.5);
                    }

                    .item {
                        display: inline-block;
                        font-size: 15px;
                        line-height: 35px;
                        height: 35px;
                        padding: 0 15px;
                        box-sizing: border-box;
                        max-width: 25%;
                        text-align: left;
                        color: #676869;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        position: relative;

                        &:last-of-type {
                            padding-right: 15px;
                        }

                        &.active {
                            color: #373839;
                            font-family: PingFangSC-Medium;
                            /*font-weight:500;*/
                        }

                        &.active:after {
                            content: " ";
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            right: 0;
                            width: 10px;
                            height: 3px;
                            /*border-radius: 2px;*/
                            border-radius: 30%;
                            text-align: center;
                            background-color: #449284;
                            transform: translateX(-50%);
                        }
                    }
                }

                .address-content {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    /*height: 196px;*/
                    overflow: hidden;
                    box-sizing: border-box;

                    ul {
                        width: 100%;
                        height: 196px;
                        overflow-y: auto;
                        box-sizing: border-box;
                        padding: 10px 13px;
                        -webkit-overflow-scrolling: touch;
                        position: static;
                        -webkit-transform: translateZ(0px);

                        li {
                            height: 35px;
                            line-height: 35px;
                            font-size: 15px;
                            width: 100%;
                            overflow-x: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: #676869;
                            cursor: pointer;
                            box-sizing: border-box;
                            display: -webkit-box;
                            display: -webkit-flex;
                            display: flex;
                            -webkit-box-align: center;
                            -webkit-align-items: center;
                            align-items: center;
                            justify-content: space-between;
                            -webkit-justify-content: space-between;

                            &.active {
                                color: #449284;
                            }

                            img {
                                width: 10px;
                                height: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>