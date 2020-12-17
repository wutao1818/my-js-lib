import request from './api';

/**
 * 获取省列表
 */
export const getProvinceList = async params => {
  return request({
    method: 'get',
    params: params,
    withCredentials: true,
    url: `/basic-data/position/provinces`
  });
};
/**
 * 获取市列表
 */
export const getCityList = async params => {
  return request({
    method: 'get',
    params: params,
    withCredentials: true,
    url: `/basic-data/position/cities`
  });
};
/**
 * 获取县/区列表
 */
export const getCountyList = async params => {
  return request({
    method: 'get',
    params: params,
    withCredentials: true,
    url: `/basic-data/position/counties`
  });
};
/**
 * 获取乡镇列表
 */
export const getTownList = async params => {
  return request({
    method: 'get',
    params: params,
    withCredentials: true,
    url: `/basic-data/position/towns`
  });
};
