// pages/drug/detail/index.js
import { request } from '../../../request/index.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {},
  },

  /**
   * 组件的初始数据
   */
  data: {},
  onLoad: function (options) {
    this.setData({ id: options.id });
    this.getDetail();
  },
  async getDetail() {
    const data = await request({
      url: '/drug/one',
      data: { id: this.data.id },
    });
    if (!data.drug_name) data.drug_name = '---';
    if (!data.simple_code) data.simple_code = '---';
    if (!data.bit_code) data.bit_code = '---';
    if (!data.specifications) data.specifications = '---';
    if (!data.dosage_form) data.dosage_form = '---';
    if (!data.packing_unit) data.packing_unit = '---';
    if (!data.approval_number) data.approval_number = '---';
    if (!data.nature_class) data.nature_class = '---';
    if (!data.drug_brand) data.drug_brand = '---';
    if (!data.constituents) data.constituents = '---';
    if (!data.property) data.property = '---';
    if (!data.indication) data.indication = '---';
    if (!data.dosage) data.dosage = '---';
    if (!data.adverse_reactions) data.adverse_reactions = '---';
    if (!data.contraindication) data.contraindication = '---';
    if (!data.attentions) data.attentions = '---';
    if (!data.interreaction) data.interreaction = '---';
    if (!data.depot) data.depot = '---';
    if (!data.manufacturer) data.manufacturer = '---';
    if (!data.address) data.address = '---';
    if (!data.mainDiseases) data.mainDiseases = [];

    this.setData({
      detail: data,
    });
  },
});
