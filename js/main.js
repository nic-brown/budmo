$(document).ready(function () {
  //░██████╗░██╗░░░██╗██╗███████╗  ░░███╗░░
  //██╔═══██╗██║░░░██║██║╚════██║  ░████║░░
  //██║██╗██║██║░░░██║██║░░███╔═╝  ██╔██║░░
  //╚██████╔╝██║░░░██║██║██╔══╝░░  ╚═╝██║░░
  //░╚═██╔═╝░╚██████╔╝██║███████╗  ███████╗
  //░░░╚═╝░░░░╚═════╝░╚═╝╚══════╝  ╚══════╝
  // Get all tabs and buttons
  const tabs = document.querySelectorAll(".tab");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const errorText = document.getElementById("error");

  // Keep track of current tab
  let currentTab = 0;
  // Function to show current tab
  function showTab() {
    // Hide all tabs
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Show current tab
    tabs[currentTab].classList.add("active");

    // Check if we are at the first or last tab
    if (currentTab === 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    if (currentTab === tabs.length - 1) {
      nextButton.disabled = true;
      nextButton.style.display = "none";
    } else {
      nextButton.disabled = false;
    }

    if (currentTab === 1) {
      $(".bar-1").addClass("step2");
      $(".bar-1 span").text("2");
      $(".quiz-img-wrap-1").addClass("disabled");
    }
    if (currentTab === 2) {
      $(".bar-1").addClass("full");

      $(".bar-1 span").text("3");
    }
  }

  // Function to check if at least one radio button is checked in each group
  function checkInputs() {
    const radioButtonGroups = tabs[currentTab].querySelectorAll('#quiz1 input[type="radio"][name]');
    const checkboxGroups = tabs[currentTab].querySelectorAll('#quiz1 input[type="checkbox"][name]');
    let allGroupsChecked = true;

    // Check radio button groups
    radioButtonGroups.forEach((group) => {
      let groupChecked = false;
      const radios = tabs[currentTab].querySelectorAll(`#quiz1 input[type="radio"][name="${group.name}"]`);

      radios.forEach((radio) => {
        if (radio.checked) {
          groupChecked = true;
        }
      });

      if (!groupChecked) {
        allGroupsChecked = false;
      }
    });

    // Check checkbox groups
    checkboxGroups.forEach((group) => {
      let groupChecked = false;
      const checkboxes = tabs[currentTab].querySelectorAll(`#quiz1 input[type="checkbox"][name="${group.name}"]`);

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          if (groupChecked) {
            allGroupsChecked = false;
            checkbox.checked = false;
          } else {
            groupChecked = true;
          }
        }
      });
    });

    return allGroupsChecked;
  }

  // Event listener for next button
  nextButton.addEventListener("click", () => {
    if (checkInputs()) {
      currentTab++;
      showTab();
      errorText.textContent = "";
    } else {
      errorText.textContent = "Перш ніж продовжити, виберіть усі варіанти.";
    }
  });

  // Event listener for previous button
  prevButton.addEventListener("click", () => {
    currentTab--;
    showTab();
    errorText.textContent = "";
  });

  // Show first tab
  showTab();

  function activeLabelClass() {
    // label active class
    document.querySelectorAll('#quiz1 input[type="radio"], #quiz1 input[type="checkbox"]').forEach((radio) => {
      // Add the class 'selected' to the label of the already checked input
      if (radio.checked) {
        radio.parentElement.classList.add("selected");
      }

      radio.addEventListener("change", function () {
        // Get the name attribute of the selected radio button
        const groupName = this.name;
        // Remove the class 'selected' from all labels in the same group
        document.querySelectorAll(`#quiz1 input[name="${groupName}"]`).forEach((radioInGroup) => {
          const label = radioInGroup.parentElement;
          label.classList.remove("selected");
        });

        // Add the class 'selected' to the label of the selected radio button
        if (this.checked) {
          this.parentElement.classList.add("selected");
        }
      });
    });
  }

  // Run the function on page load
  window.addEventListener("load", activeLabelClass);

  // Run the function on input change
  document.querySelectorAll('#quiz1 input[type="radio"], #quiz1 input[type="checkbox"]').forEach((input) => {
    input.addEventListener("change", activeLabelClass);
  });

  // CALCULATE PRICE
  // Get all the input elements with the "data-price" attribute
  const priceInputs = document.querySelectorAll("[data-price]");
  // Function to calculate the total price
  function calculateTotalPrice() {
    let totalPrice = 0;

    // Loop through all the price inputs and add their values
    priceInputs.forEach((input) => {
      if (input.checked) {
        totalPrice += parseFloat(input.dataset.price);
      }
    });

    // Update the total price display
    document.querySelector(".price-total-1 span").textContent = `${totalPrice.toFixed(0)}`;
  }

  // Call the calculateTotalPrice function when the page loads
  calculateTotalPrice();

  // Call the calculateTotalPrice function when any input changes
  priceInputs.forEach((input) => {
    input.addEventListener("change", calculateTotalPrice);
  });

  //CHANGE IMAGES
  const imageTypeRadios = document.querySelectorAll(".image-type");
  const imageColorRadios = document.querySelectorAll(".image-color");
  const image = document.getElementById("quiz-img");

  function updateImageSource() {
    const selectedImageType = document.querySelector(".image-type:checked").dataset.picture;
    const selectedImageColor = document.querySelector(".image-color:checked").dataset.picture;
    image.src = `img/${selectedImageType}-${selectedImageColor}.png`;
  }

  imageTypeRadios.forEach((radio) => {
    radio.addEventListener("change", updateImageSource);
  });

  imageColorRadios.forEach((radio) => {
    radio.addEventListener("change", updateImageSource);
  });

  //  ░██████╗░██╗░░░██╗██╗███████╗  ░░███╗░░  ███████╗███╗░░██╗██████╗░
  //  ██╔═══██╗██║░░░██║██║╚════██║  ░████║░░  ██╔════╝████╗░██║██╔══██╗
  //  ██║██╗██║██║░░░██║██║░░███╔═╝  ██╔██║░░  █████╗░░██╔██╗██║██║░░██║
  //  ╚██████╔╝██║░░░██║██║██╔══╝░░  ╚═╝██║░░  ██╔══╝░░██║╚████║██║░░██║
  //  ░╚═██╔═╝░╚██████╔╝██║███████╗  ███████╗  ███████╗██║░╚███║██████╔╝
  //  ░░░╚═╝░░░░╚═════╝░╚═╝╚══════╝  ╚══════╝  ╚══════╝╚═╝░░╚══╝╚═════╝░
  const tabs2 = document.querySelectorAll(".tab2");
  const prevButton2 = document.getElementById("prev2");
  const nextButton2 = document.getElementById("next2");
  const errorText2 = document.getElementById("error2");

  // Keep track of current tab
  let currentTab2 = 0;
  // Function to show current tab
  function showTab2() {
    tabs2.forEach((tab) => tab.classList.remove("active"));
    tabs2[currentTab2].classList.add("active");
    if (currentTab2 === 0) {
      prevButton2.disabled = true;
    } else {
      prevButton2.disabled = false;
    }

    if (currentTab2 === tabs2.length - 1) {
      nextButton2.disabled = true;
      nextButton2.style.display = "none";
    } else {
      nextButton2.disabled = false;
    }
    if (currentTab2 === 1) {
      $(".bar-2").addClass("step2");
      $(".bar-2 span").text("2");
      $(".quiz-img-wrap-2").addClass("disabled");
    }
    if (currentTab2 === 2) {
      $(".bar-2").addClass("full");

      $(".bar-2 span").text("3");
    }
  }

  // Function to check if at least one radio button is checked in each group
  function checkInputs2() {
    const radioButtonGroups = tabs[currentTab].querySelectorAll('#quiz2 input[type="radio"][name]');
    const checkboxGroups = tabs[currentTab].querySelectorAll('#quiz2 input[type="checkbox"][name]');
    let allGroupsChecked = true;

    // Check radio button groups
    radioButtonGroups.forEach((group) => {
      let groupChecked = false;
      const radios = tabs[currentTab].querySelectorAll(`#quiz2 input[type="radio"][name="${group.name}"]`);

      radios.forEach((radio) => {
        if (radio.checked) {
          groupChecked = true;
        }
      });

      if (!groupChecked) {
        allGroupsChecked = false;
      }
    });

    // Check checkbox groups
    checkboxGroups.forEach((group) => {
      let groupChecked = false;
      const checkboxes = tabs[currentTab].querySelectorAll(`#quiz2 input[type="checkbox"][name="${group.name}"]`);

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          if (groupChecked) {
            allGroupsChecked = false;
            checkbox.checked = false;
          } else {
            groupChecked = true;
          }
        }
      });
    });

    return allGroupsChecked;
  }

  // Event listener for next button
  nextButton2.addEventListener("click", () => {
    if (checkInputs2()) {
      currentTab2++;
      showTab2();
      errorText2.textContent = "";
    } else {
      errorText2.textContent = "Перш ніж продовжити, виберіть усі варіанти.";
    }
  });

  // Event listener for previous button
  prevButton2.addEventListener("click", () => {
    currentTab2--;
    showTab2();
    errorText2.textContent = "";
  });

  // Show first tab
  showTab2();
  function activeLabelClass2() {
    // label active class
    document.querySelectorAll('#quiz2 input[type="radio"], #quiz2 input[type="checkbox"]').forEach((radio) => {
      // Add the class 'selected' to the label of the already checked input
      if (radio.checked) {
        radio.parentElement.classList.add("selected");
      }

      radio.addEventListener("change", function () {
        // Get the name attribute of the selected radio button
        const groupName = this.name;
        // Remove the class 'selected' from all labels in the same group
        document.querySelectorAll(`#quiz2 input[name="${groupName}"]`).forEach((radioInGroup) => {
          const label = radioInGroup.parentElement;
          label.classList.remove("selected");
        });

        // Add the class 'selected' to the label of the selected radio button
        if (this.checked) {
          this.parentElement.classList.add("selected");
        }
      });
    });
  }

  // Run the function on page load
  window.addEventListener("load", activeLabelClass2);

  // Run the function on input change
  document.querySelectorAll('#quiz2 input[type="radio"], #quiz2 input[type="checkbox"]').forEach((input) => {
    input.addEventListener("change", activeLabelClass2);
  });

  // CALCULATE PRICE
  // Get all the input elements with the "data-price" attribute
  const priceInputs2 = document.querySelectorAll("[data-price-second]");
  // Function to calculate the total price
  function calculateTotalPrice2() {
    let totalPrice = 0;

    // Loop through all the price inputs and add their values
    priceInputs2.forEach((input) => {
      if (input.checked) {
        totalPrice += parseFloat(input.dataset.priceSecond);
      }
    });

    // Update the total price display
    document.querySelector(".price-total-2 span").textContent = `${totalPrice.toFixed(0)}`;
  }

  // Call the calculateTotalPrice function when the page loads
  calculateTotalPrice2();

  // Call the calculateTotalPrice function when any input changes
  priceInputs2.forEach((input) => {
    input.addEventListener("change", calculateTotalPrice2);
  });

  //CHANGE IMAGES
  const imageTypeRadios2 = document.querySelectorAll(".image-type2");
  const imageColorRadios2 = document.querySelectorAll(".image-color2");
  const image2 = document.getElementById("quiz-img2");

  function updateImageSource2() {
    const selectedImageType = document.querySelector(".image-type2:checked").dataset.picture;
    const selectedImageColor = document.querySelector(".image-color2:checked").dataset.picture;
    image2.src = `img/${selectedImageType}-${selectedImageColor}.png`;
  }

  imageTypeRadios2.forEach((radio) => {
    radio.addEventListener("change", updateImageSource2);
  });

  imageColorRadios2.forEach((radio) => {
    radio.addEventListener("change", updateImageSource2);
  });

  // $.fancybox.open({
  //   src: "#consl-popup",
  //   type: "inline",

  //   opts: {
  //     backFocus: false,
  //     autoFocus: false,
  //     touch: false,
  //     beforeShow: function (instance, current) {
  //       $(".fancybox-custom-overlay").addClass("active");
  //     },
  //     beforeClose: function (instance, current) {
  //       $(".fancybox-custom-overlay").removeClass("active");
  //     },
  //   },
  // });

  gsap.registerPlugin(ScrollTrigger);

  if ($(".main-header").length) {
    const tl = gsap.timeline({
      ease: "none",
    });

    tl.fromTo(
      ".header-clouds",
      {
        scale: 1,
        duration: 1,
        transformOrigin: "bottom center",
      },
      {
        duration: 1,
        scale: 1.15,
      }
    );
    ScrollTrigger.create({
      trigger: ".main-header",
      start: "top top",
      // start: 100,
      end: "+=100%",
      pin: false,
      animation: tl,
      scrub: 1,
      pinSpacing: false,
    });
  }

  //  SIMPLE ANIMATIONS WITH GSAP

  const buttons = gsap.utils.toArray("#main-nav");
  buttons.forEach((btn) => {
    gsap.from(btn, {
      scrollTrigger: {
        // markers: true,
        start: "bottom 20%",
        // start: "top 10%",
        trigger: ".main-header",
        endTrigger: ".main-footer",
        onEnter() {
          btn.classList.add("fixed");
        },
        onLeave() {
          btn.classList.add("fixed");
        },
        onEnterBack() {
          btn.classList.add("fixed");
        },
        onLeaveBack() {
          btn.classList.remove("fixed");
        },
      },
    });
  });

  $(".scroll-to").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - $("nav").outerHeight(), // minus nav height
      },
      1000
    );
  });

  // const detailBtns = document.querySelectorAll(".serv-btn-detail");
  // detailBtns.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     const originalElements1 = btn.dataset.rentTab1;
  //     const originalElements2 = btn.dataset.rentTab2;
  //     const originalElements3 = btn.dataset.rentTab3;
  //     const originalElements4 = btn.dataset.rentTab4;
  //     const getFranchise = btn.dataset.franchise;
  //     document.querySelector(".total-franchise span").innerHTML = getFranchise + " €";
  //     const getCardContent = btn.closest(".cat-card").querySelector(".cat-card-inner").innerHTML;
  //     // console.log(getCardContent);

  //   });
  // });

  $(".open-step-list").click(function () {
    $(this).text(function (i, text) {
      text.replace("\n", "");
      console.log(WPcustom.show_serv_menu_text1 + "  " + text);
      return text == WPcustom.show_serv_menu_text1 ? WPcustom.show_serv_menu_text2 : WPcustom.show_serv_menu_text1;
    });

    $(".port-nav").toggleClass("open");
  });
  $(".port-nav-btn").click(function () {
    $(".port-nav").removeClass("open");
  });

  if ($(".wpcf7").length) {
    let wpcf7Elm = document.querySelectorAll(".wpcf7");

    function contactFormNotifications() {
      for (var i = 0; i < wpcf7Elm.length; i++) {
        wpcf7Elm[i].addEventListener(
          "wpcf7mailsent",

          function (event) {
            $.fancybox.close();
            $.fancybox.open({
              src: "#thx-popup",

              type: "inline",

              opts: {
                beforeShow: function (instance, current) {
                  $(".fancybox-custom-overlay").addClass("active");
                },

                beforeClose: function (instance, current) {
                  $(".fancybox-custom-overlay").removeClass("active");
                },
              },
            });

            setTimeout(function () {
              $.fancybox.close();
            }, 5000);

            console.log("mail was sent!");
          },

          false
        );

        wpcf7Elm[i].addEventListener(
          "wpcf7invalid",

          function (event) {
            console.log("wpcf7invalid");
          },

          false
        );

        wpcf7Elm[i].addEventListener(
          "wpcf7mailfailed",

          function (event) {
            console.log("failed");
          },

          false
        );
      }
    }

    contactFormNotifications();
  }

  if ($("input[name='your-tel']").length) {
    $("input[name='your-tel']").mask("+38 099 999 99 99", {
      completed: function () {
        this.attr("aria-invalid", "false");

        this.closest(".wpcf7-form-control-wrap")

          .find(".wpcf7-not-valid-tip")

          .remove();
      },
    });
  }

  // $(window).on("resize scroll", function () {
  //   var scroll = $(window).scrollTop();
  //   if (scroll >= 1000) {
  //     $("#main-nav").addClass("fixed");
  //   } else {
  //     // if (!$(".nav-mob").hasClass("visible")) {
  //     $("#main-nav").removeClass("fixed");
  //     // }
  //   }
  // });

  // ANIMATIONS ==========================================
  ScrollTrigger.batch(".double-card", {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
      }),
    start: "150px bottom", // запуск анімації, коли низ  екрану пройшов 100px до цілі
  });

  ScrollTrigger.batch(".work-card,.warr-ani", {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      }),
    start: "150px bottom", // запуск анімації, коли низ  екрану пройшов 100px до цілі
  });
  ScrollTrigger.batch(".param-ani", {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    onEnter: (batch) =>
      gsap.to(batch, {
        // x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      }),
    start: "150px bottom", // запуск анімації, коли низ  екрану пройшов 100px до цілі
  });

  ScrollTrigger.batch(".cont-card", {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    onEnter: (batch) =>
      gsap.to(batch, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
      }),
    start: "150px bottom", // запуск анімації, коли низ  екрану пройшов 100px до цілі
  });

  ScrollTrigger.batch(".footer-ani", {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      }),
    start: "150px bottom", // запуск анімації, коли низ  екрану пройшов 100px до цілі
  });

  // $.fancybox.open({
  //   src: "#thx-popup",
  //   type: "inline",

  //   opts: {
  //     backFocus: false,
  //     autoFocus: false,
  //     touch: false,
  //     beforeShow: function (instance, current) {
  //       $(".fancybox-custom-overlay").addClass("active");
  //     },
  //     beforeClose: function (instance, current) {
  //       $(".fancybox-custom-overlay").removeClass("active");
  //     },
  //   },
  // });

  $(".reg-burger").click(function (e) {
    $(this).toggleClass("active");

    $(".menu-overlay").toggleClass("active");
    $(".menu-wrapper").toggleClass("active");
  });

  $(".menu-overlay").click(function (e) {
    $(".reg-burger").removeClass("active");
    $(".menu-overlay").removeClass("active");
    $(".menu-wrapper").removeClass("active");
  });

  // $(".reg-burger")
  //   .mouseenter(function () {
  //     $(".menu-overlay").addClass("active");
  //   })
  //   .mouseleave(function () {
  //     $(".menu-overlay").removeClass("active");
  //   });

  $(".lazy").Lazy({
    // your configuration goes here
    // scrollDirection: 'vertical',
    // effect: 'fadeIn',
    threshold: 1500,
    visibleOnly: true,
    onError: function (element) {
      console.log("error loading " + element.data("src"));
    },
  });

  function updateTimer() {
    // Get current time
    var now = new Date();

    // Set target time to 00:00 of the next day
    var target = new Date(now);
    target.setDate(target.getDate() + 1);
    target.setHours(0, 0, 0, 0);

    // Calculate time difference
    var diff = target - now;

    // Check if countdown has reached zero
    if (diff <= 0) {
      // Hide the timer
      document.querySelector(".timer").style.display = "none";
      return; // Stop further execution
    }

    // Convert time difference to hours, minutes, and seconds
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Display the countdown timer
    var timerDisplay = document.querySelector(".timer");
    // timerDisplay.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

    $(".timer-h").text(hours);
    $(".timer-m").text(minutes);
    $(".timer-s").text(seconds);

    // Update the timer every second
    setTimeout(updateTimer, 1000);
  }

  // Start the countdown timer
  updateTimer();

  console.log("doc is ready to use and manipulte");

  $("[data-fancybox]").fancybox({
    youtube: {
      controls: 0,
      showinfo: 0,
    },
    vimeo: {
      color: "f00",
    },
  });

  $(".open-popup").fancybox({
    type: "inline",
    thumbs: false,
    loop: false,
    touch: false,
    infobar: false,
    buttons: ["close"],
    hash: false,
    backFocus: false,
    autoFocus: false,
    beforeShow: function (instance, current) {
      $(".fancybox-custom-overlay").addClass("active");
    },
    beforeClose: function (instance, current) {
      $(".fancybox-custom-overlay").removeClass("active");
    },
    // beforeLoad: function (instance, current) {
    //   if (instance.current.src == "#main-menu-pop") {
    //     instance.$refs.container.addClass("main-menu-pop-fancy");
    //     var eTop =
    //       $("#open-catalog").offset().top + $("#open-catalog").outerHeight(); //get the offset top of the element
    //     $("#main-menu-pop").css(
    //       "margin-top",
    //       eTop - $(window).scrollTop() + "px"
    //     );
    //   }
    //   // console.log(instance.current.src);
    // },
  });

  // Код для збирання інфи для відправки даних у формі
  const inputElement = document.getElementById("myInput");
  const checkedValues = {};
  function updateCheckedValues() {
    Object.keys(checkedValues).forEach((key) => {
      delete checkedValues[key];
    });

    const checkedInputs = document.querySelectorAll("input:checked");

    checkedInputs.forEach((input) => {
      const name = input.name;
      const value = input.value + "\n";
      checkedValues[name] = value;
    });

    console.log(checkedValues);
    // Set the input value to the stringified object
    //inputElement.value = JSON.stringify(checkedValues); // таким чином можна передати обэкт в текстовий інпут
  }
  updateCheckedValues();
});
