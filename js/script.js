window.addEventListener("DOMContentLoaded", () => {
  const homeSlider = new Swiper(".home-friends__slider", {
    
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      }
    }
  })
  
  const headerActions = {
    menuButton: document.querySelector(".header-toggle-button-menu"),
    toggleMenuNode: document.querySelector(".header-toggle-menu"),
    toggleSearchNode: document.querySelector(".header-toggle-search"),
    searchButton: document.querySelector(".header-toggle-button-search"),
    closeSearchButton: document.querySelector(".header-toggle__close"),
    bodyNode: document.querySelector("body"),
    toggleMenu() {
      this.menuButton.classList.toggle("opened")
      this.toggleMenuNode.classList.toggle("opened")
      this.bodyNode.classList.toggle("no-scroll")
      
    },
    showSearch() {
      this.searchButton.classList.add("opened")
      this.toggleSearchNode.classList.add("opened")
      this.bodyNode.classList.add("no-scroll")
      this.closeSearchButton.addEventListener("click", this.closeSearch.bind(this), {once: true})
    },
    closeSearch() {
      this.searchButton.classList.remove("opened")
      this.toggleSearchNode.classList.remove("opened")
      this.bodyNode.classList.remove("no-scroll")
    },
    addHandlers() {
      this.menuButton.addEventListener("click", this.toggleMenu.bind(this))
      this.searchButton.addEventListener("click", this.showSearch.bind(this))
    },
    setBlockedNodes() {
      this.toggleMenuNode.style.display = "block"
      this.toggleSearchNode.style.display = "block"
    },
    init() {
      setTimeout(this.setBlockedNodes.bind(this), 500)
      this.addHandlers()
    }
  }
  
  headerActions.init()
//   const formData = {
//     name: '',
//     email: '',
//     phone: '',
//     question: ''
//   }
//
//   const form  = document.querySelector(".form form")
//   const url = "/ajax/sendForm.php"
//   const successForm = document.querySelector(".k1-modal.success")
//
//   function validatePhone(value) {
//     const reg = new RegExp(/\D/g)
//     return value.replace(reg, "").length >= 10
//   }
//
//   function validateEmail(value) {
//     const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
//     return reg.test(value)
//   }
//
//   function validateFields() {
//     let hasError = false
//     for(let key in formData) {
//       if (formData.hasOwnProperty(key)) {
//         const node = document.querySelector(`[name="${key}"]`).closest("div")
//         node.classList.remove("error")
//         if (key === "phone") {
//           const validPhone = validatePhone(formData[key])
//           if (validPhone) node.classList.remove("error")
//           else {
//             node.classList.add("error")
//             hasError = true
//           }
//         }
//         if (key === "email") {
//           const validEmail = validateEmail(formData[key])
//           if (validEmail) node.classList.remove("error")
//           else {
//             node.classList.add("error")
//             hasError = true
//           }
//         }
//         if (!formData[key]) {
//           node.classList.add("error")
//           hasError = true
//         }
//       }
//     }
//     return hasError
//   }
//
//   function sendData() {
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(formData)
//     }).then(res => res.json()).then(data => {
//       console.log(data)
//       if (!data?.error) {
//         successForm.style.display = "flex"
//         for(let key in formData) {
//           if (formData.hasOwnProperty(key)) {
//             formData[key] = "";
//             const input = document.querySelector(`[name="${key}"]`)
//             input.value = ""
//           }
//         }
//         setTimeout(() => {
//           successForm.style.display = "none"
//         }, 2000)
//       }
//     })
//     // const data = res.json()
//   }
//
//   for(let key in formData) {
//     if (formData.hasOwnProperty(key)) {
//       const field = document.querySelector(`[name="${key}"]`)
//       formData[key] = field.value
//       if (key === "phone") {
//         const mask = new PhoneMask({mask: "+7 (xxx) xxx xx xx"})
//       }
//       field.addEventListener("input", ({target}) => {
//         if (target.value) field.closest("div").classList.remove("error")
//         formData[key] = target.value
//       })
//     }
//   }
//
//   form.addEventListener("submit", event => {
//     event.preventDefault()
//     if (validateFields()) return false
//     sendData()
//   })
//
//
//
})