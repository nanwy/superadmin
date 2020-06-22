export function imgPreview(file) {
  // console.log(file);
  let _this = this;
  // 看是否支持fileReader
  // 将图片转为base64
  let reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onloadend = function (res) {
      let result = res.target.result;
      let isLt2M = res.total / 1024 / 1024 < 2;
      let img = new Image();
      img.src = result;
      // console.log(img);

      img.onload = function () {
        // 图片压缩
        file = compress(img, file.name);
        // console.log("压缩后的图片", file);
        resolve(file);
      };
    };
  });
}
export function compress(img, filename) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let canvasWidth = img.width / 2;
  let canvasHeight = img.height / 2;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  // 在指定图片格式为image/jpeg或iimage.webp的情况下，可以从0-1的区间内选择图片的质量，超出取值范围内，默认为0.92
  let ndata = canvas.toDataURL("image/jpeg", 0.5);
  // 将base64的图片格式转为File
  let pic = dataURLtoFile(ndata, filename);
  // console.log(pic);
  // 判断压缩后的图片是否小于2MB
  imgPreview(pic);

  return pic;
}
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}