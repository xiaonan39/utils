var Method=(function () {
  return {
      getURLObject:function (url) {
          if(!~url.indexOf("?")) return;
          url=url.split("?")[1];
          var obj={};
          var arr;
          var arr1;
          var bool=false;
          if(!~url.indexOf("&")){
              if(!~url.indexOf("=")) return;
              arr=url.split("=");
              obj[arr[0]]=isNaN(Number(arr[1])) ? arr[1] : Number(arr[1]);
              return obj;
          }
          arr=url.split("&");
          for(var i=0;i<arr.length;i++){
              if(!~arr[i].indexOf("=")) continue;
              arr1=arr[i].split("=");
              if(arr1[0].length===0) continue;
              obj[arr1[0]]=isNaN(Number(arr1[1])) ? arr1[1] : Number(arr1[1]);
              bool=true;
          }
          if(bool) return obj;
      },


      // reduce二维数组转一维数组
      reduceArray:function(arr) {
          arr.reduce(function(a,b) {
              return a.concat(b);
          })
      },
      // es6二维数组转一维数组，多维数组也可
      esFlatten(arr) {
          return [].concat(...arr.map(x => Array.isArray(x) ? esFlatten(x) : x));
      },
      // apply二维数组转一维数组
      applyArray(arr) {
          return [].concat.apply([],arr);
      },
      // 字符串数组转整型数组的简单方法
      strArrToNumArr(arr) {


      },

      // 数组对象去重-遍历方式,第一个为数组
      arrObjGoHeavyErgodic(arr,attr) {
          let res = [];
          let obj = {};
          for(let i = 0 ; i < arr.length; i++) {
              if(!obj[arr[i][attr]]) {
                  res.push(arr[i]);
                  obj[arr[i][attr]] = true;
              }
          }
          return res;
      },
      // 数组对象es6map去重，第一个参数是传入的数组，第二个参数是判断的属性.使用时第二个参数需要是字符串：'attr'。
      arrObjGoHeavyMap(arr,attr) {
          let map = new Map();
          for(let item of arr) {
              if(!map.has(item[attr])) {
                  map.set(item[attr],item);
              }
          }
          return [...map.values()];
      },
      // 利用reduce，第一个参数是需要去重的数组，第二个参数是判断的属性
      arrObjGoHeavyReduce(arr,attr) {
          // reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
          var obj = {};
          return arr.reduce(function(item,next) {
              obj[next[attr]] ? '' : obj[next[attr]] = true && item.push(next);
              return item;
          },[]);
      },

      // 数组对象排序,array.sort(Method.arrayObjSort)；（升序asc，降序desc），key是要可以随意变化的。null升序中为最小，降序中为最大
      arrayObjSort(type,sort) {//麻烦版
        return function(sort1,sort2) {
          /* var val1 = sort1[type];
          var val2 = sort2[type]; */
          if(sort === 'desc') {//降序(从大到小)
            var val1 = sort1[type];
            var val2 = sort2[type];
            if(val1 === null || val2 === null) {
              return 1;
            }
            else if (val1 < val2) {
              return 1;
            }
            else if(val1 > val2) {
              return -1;
            }
            else {
              return 0;
            }
          }
          else {
            //升序(从小到大)
            var val1 = sort1[type];
            var val2 = sort2[type];
            if (val1 < val2) {
              return -1;
            }
            else if(val1 > val2) {
              return 1;
            }
            else {
              return 0;
            }
          }
        };
      },
      
      // 使用：array.sort(Method.arrayObjSortSimple('排序的属性','desc'))
      arrayObjSortSimple(type,sort) {
        return function(a,b) {
          if(sort === 'desc') {
            return b[type] - a[type];
          }
          else {
            return a[type] - b[type];
          }
        }
      },
      // 判断是否为数字,一位或者多位
      isNumber(value) {
          return /^\d+$/.test(value);
      },

      // 数组对象随着数组排序 Method.arrobjWithArrSort(数组, 对象, 'type' )
      arrobjWithArrSort(arr, obj, type) {
        return obj.sort((a,b) => {
          return arr.indexOf(a[type]) - arr.indexOf(b[type]);
        });
      }

  };
})();