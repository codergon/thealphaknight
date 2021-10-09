$(document).ready(function () {
  var count = 0;
  const Loader = async () => {
    if (count > 100) {
      setTimeout(() => {
        $(".loader_comp").animate({ opacity: 0, zIndex: -1 }, 100);
      }, 1500);
      clearInterval(id);
    } else {
      $(".loader_county").text(count);
      count++;
    }
  };
  const id = setInterval(Loader, 30);
});
