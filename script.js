window.addEventListener('DOMContentLoaded', (event) => {

    const imageUpload = document.getElementById('image-upload');
    const mainImage = document.getElementById('main-image');
    const watermarkUpload = document.getElementById('watermark-upload');

    let watermarkImage = document.getElementById('watermark-image');
    let selectedWatermarkImage = document.getElementById('selected-watermark-image');

    const applyWatermarkBtn = document.getElementById('apply-watermark-btn');
    const downloadLink = document.getElementById('download-link');
    const resultImage = document.getElementById('result-image');

    const watermarkPositionXInput = document.getElementById('watermark-position-x');
    const watermarkPositionYInput = document.getElementById('watermark-position-y');

    const watermarkOpacityInput = document.getElementById('watermark-opacity');
    const watermarkOpacityValue = document.getElementById('watermark-opacity-value');

    const watermarkSizeInput = document.getElementById('watermark-size');
    const watermarkSizeValue = document.getElementById('watermark-size-value');

    const watermarkImages = document.querySelectorAll('.watermark-image');

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    function imageUploadHandler() {
      const file = imageUpload.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        mainImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  
    function watermarkUploadHandler(e) {
      const file = watermarkUpload.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        watermarkImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  
    function opacityInputHandler() {
      watermarkOpacityValue.textContent = watermarkOpacityInput.value;
    }
  
    function sizeInputHandler() {
      watermarkSizeValue.textContent = watermarkSizeInput.value;
    }
  
    function drawWatermark() {
      const image = new Image();
      image.src = mainImage.src;

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);

        const watermark = new Image();
        watermark.src = selectedWatermarkImage.src;

        watermark.onload = function () {
          const watermarkOpacity = parseFloat(watermarkOpacityInput.value);
          const watermarkSize = parseInt(watermarkSizeInput.value);

          const watermarkWidth = watermark.width * watermarkSize;
          const watermarkHeight = watermark.height * watermarkSize;
          
          const watermarkPositionX = parseInt(watermarkPositionXInput.value);
          const watermarkPositionY = parseInt(watermarkPositionYInput.value);
          
          context.globalAlpha = watermarkOpacity;
          
          context.drawImage(watermark, watermarkPositionX, watermarkPositionY, watermarkWidth, watermarkHeight);
          const resultSrc = canvas.toDataURL('image/jpeg');
          resultImage.src = resultSrc;
          
          downloadLink.href = resultSrc;
          downloadLink.style.display = 'inline';
        };
      };
    }
  
    function watermarkImageClickHandler() {
      const selectedWatermark = this.getAttribute('src');
      selectedWatermarkImage.src = selectedWatermark;
      drawWatermark();
    }
  
    imageUpload.addEventListener('change', imageUploadHandler);
    watermarkUpload.addEventListener('change', watermarkUploadHandler);
   
    watermarkPositionXInput.addEventListener('change', drawWatermark);
    watermarkPositionYInput.addEventListener('change', drawWatermark);
   
    watermarkOpacityInput.addEventListener('input', opacityInputHandler);
    watermarkSizeInput.addEventListener('input', sizeInputHandler);
   
    watermarkImages.forEach(function (image) {
      image.addEventListener('click', watermarkImageClickHandler);
    });
  
    applyWatermarkBtn.addEventListener('click', drawWatermark);
  });