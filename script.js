const fileInput = document.getElementById("file");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll('.rotate button')
const previewImg = document.querySelector(".preview-img img");
const chooseImgBtn = document.getElementById("choose");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0]; // getting user selected file
  if (!file) return; // return if user hasn't selected file
  previewImg.src = URL.createObjectURL(file); // passing file URL as preview img src
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilter();
};

rotateOptions.forEach(option => {
    option.addEventListener('click', () => {
        if(option.id === 'left') {
            rotate -= 90 // if left rotate btn is clicked, decrement by rotate value by -90
        } else if(option.id === 'right') {
            rotate += 90 // if right rotate btn is clicked, increment by rotate value by +90
        }
        else if(option.id === 'horizontal') {
            // if flipHorizontal value is 1, set this value to -1 else set to 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            // if flipVertical value is 1, set this value to -1 else set to 1
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    })
});

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
