// getters相当于Vue组件中的computed 所以里面的对象都是函数实现的方法
export default {
  length(state) {
    return state.userInfo.cartList.length;
  },
  list(state) {
    return state.userInfo.cartList;
  },
  delGoods(state) {
    return state.userInfo.delgoods;
  },
  takGoods(state) {
    return state.userInfo.takgoods;
  },
  waitGoods(state) {
    return state.userInfo.waitPaygoods;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getTrait(state) {
    return state.userInfo.protrait;
  },
  getAddress(state) {
    return state.userInfo.address;
  },
  getPhone(state) {
    let tmp = state.userInfo.phone;
    return tmp.slice(0, 3) + "****" + tmp.slice(-4);
  },
  // 这个是购物时候的地址
  getTmpAddress(state) {
    return state.address;
  },
  getDefaultAddress(state) {
    // if (state.userInfo.address.length > 0) {
    // let item = state.userInfo.address.find((item) => {
    //   return item.checked == true;
    // });
    // if (!item) return item.address;
    // else return false;
    if (state.userInfo.address.length != 0) {
      let tmp = state.userInfo.address.find((item) => {
        return item.checked == true;
      }); // 总算知道为啥不能写这了 就是当条件不符合时, tmp 下是没有address这个属性的
      if (tmp) {
        return tmp.address;
      } else {
        return false;
      }
    } else {
      return false;
    }

    // } else return false;
    // return state.userInfo.address.checked
  },
};
