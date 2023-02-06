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
  
  const informationSlider = new Swiper(".information-help__slider .swiper", {
    
    loop: false,
    spaceBetween: 30,
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
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      }
    }
  })
  
  const interestingSlider = new Swiper(".interesting__slider .swiper", {
    
    loop: false,
    spaceBetween: 30,
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
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 3,
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
    wrapperHandlerBind: null,
    windowClickHandler(type, {target}) {
      console.log(type)
      const isParentToggle = target.closest(".header-toggle.opened")
      if (!isParentToggle) {
        if (type === "menu") {
          this.menuButton.classList.remove("opened")
          this.toggleMenuNode.classList.remove("opened")
        }
      }
      this.bodyNode.classList.remove("no-scroll")
      window.removeEventListener("click", this.windowClickHandler.bind())
    },
    wrapperHandler({target}) {
      if (target.closest(".header-toggle-search") && !target.closest(".header-toggle")) {
        this.closeSearch()
      }
      if (!target.closest(".header-toggle") && target.closest(".header-toggle-menu")) {
        this.menuButton.classList.remove("opened")
        this.toggleMenuNode.classList.remove("opened")
        this.bodyNode.classList.remove("no-scroll")
      }
    },
    toggleMenu() {
      this.menuButton.classList.toggle("opened")
      this.toggleMenuNode.classList.toggle("opened")
      this.bodyNode.classList.toggle("no-scroll")
      
      this.toggleMenuNode.removeEventListener("click", this.wrapperHandlerBind)
      this.toggleMenuNode.addEventListener("click", this.wrapperHandlerBind)
    },
    showSearch() {
      this.searchButton.classList.add("opened")
      this.toggleSearchNode.classList.add("opened")
      this.bodyNode.classList.add("no-scroll")
      this.closeSearchButton.addEventListener("click", this.closeSearch.bind(this), {once: true})
      this.toggleSearchNode.removeEventListener("click", this.wrapperHandlerBind)
      this.toggleSearchNode.addEventListener("click", this.wrapperHandlerBind)
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
      this.wrapperHandlerBind = this.wrapperHandler.bind(this)
      setTimeout(this.setBlockedNodes.bind(this), 1500)
      this.addHandlers()
    }
  }
  
  const circleProgress = {
    circles: document.querySelectorAll(".progress-circle"),
    init() {
      this.circles.forEach(circle => {
        const percent = circle.getAttribute("data-percent")
        const picture = circle.querySelector("circle.current")
        const radius = picture.r.baseVal.value
        const length = 2 * Math.PI * radius
        picture.style.strokeDasharray = `${length} ${length}`
        picture.style.strokeDashoffset = length - length * percent / 100
      })
    }
  }
  
  const formUtils = {
    formName: "",
    isValidatePhone(value) {
      return !(value.length < 11)
    },
    isValidMail(value) {
      const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      return reg.test(value)
    },
    removeInputError(node) {
      node.closest(".form-input").classList.remove("error")
    },
    inputHandler({target}) {
      const {name, value} = target
      switch (name) {
        case "mail" :
          if (this.isValidMail(value)) this.removeInputError(target)
          break
        case "phone" :
          if (this.isValidatePhone(value)) this.removeInputError(target)
          break;
      }
      
    },
    getFormData(formName) {
      const form = document.forms[formName]
      const formData = new FormData(form)
      const data = {}
      let hasError = false
      for (let pair of formData.entries()) {
        if (pair[0] === "offer") {
            const area = form.querySelector("[name='offer']").closest("div")
          if (!pair[1].length) {
            hasError = true
            area.classList.add("error")
            area.addEventListener("input", ({target}) => {
              if (target.value.length) {
                area.classList.remove("error")
              }
            })
          } else {
            data[`${pair[0]}`] = pair[1]
            area.classList.remove("error")
          }
          continue
        }
        if (pair[0] === "phone") {
          const input = form.querySelector("[name='phone']").closest(".form-input")
          if (!this.isValidatePhone(pair[1])) {
            input.classList.add("error")
            hasError = true
            input.addEventListener("input", this.inputHandler.bind(this))
          } else {
            input.classList.remove("error")
            data[`${pair[0]}`] = pair[1]
          }
          continue
        }
        if (pair[0] === "mail") {
          const input = form.querySelector("[name='mail']").closest(".form-input")
          if (!this.isValidMail(pair[1])) {
            input.classList.add("error")
            hasError = true
            input.addEventListener("input", this.inputHandler.bind(this))
          } else {
            input.classList.remove("error")
            data[`${pair[0]}`] = pair[1]
          }
          continue
        }
        data[`${pair[0]}`] = pair[1]
      }
      return {
        data, hasError
      }
    },
    sendData(formName, urlString, event) {
      event.preventDefault();
      this.formName = formName
      const url = urlString !== "url" ? urlString : "url"
      console.log("url-", url)
      const {data, hasError} = this.getFormData(formName)
      if (hasError) {
        console.log("error")
        return false
      } else {
        console.log("clean")
        if (url !== "url" ) {
          fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
          }).then(res => res.json()).then(data => {
            console.log(data)
            if (!data?.error) {
              this.showSuccessModal()
            }
          })
          console.log(data)
        } else {
          // delete after add backend
          this.showSuccessModal()
        }
        
        // this.showSuccessVacancyBind()
        // setTimeout(, 3000)
      
        
      }
    },
    cleanForm(formName) {
      const form = document.forms[formName]
      const formData = new FormData(form)
      for (let pair of formData.entries()) {
        form.querySelector(`[name=${pair[0]}]`).value = ""
      }
    },
    showSuccessModal() {
      const modal = document.querySelector(".modal[data-modal-name='success']")
      modal.classList.add("opened")
      this.cleanForm(this.formName)
      setTimeout(function() {
        modal.classList.remove("opened")
      }, 2000)
    }
  }
  
  const modal = {
    bodyNode: document.querySelector("body"),
    modalBackArray: document.querySelectorAll(".modal-bg"),
    modalVacancyOpenArray: document.querySelectorAll("[data-modal='vacancy']"),
    currentModal: null,
    addListeners() {
      if (this.modalVacancyOpenArray.length) {
        this.modalVacancyOpenArray.forEach(button => {
          button.addEventListener("click", this.showModalBind)
        })
      }
    },
    showModal(event) {
      event.preventDefault()
      this.currentModal = document.querySelector("[data-modal-name='vacancy']")
      const hiddenInput = this.currentModal.querySelector("input[name='vacancy']")
      const button = event.target.closest(".vacancy__button")
      hiddenInput.value = button
        .closest(".vacancy__item")
        .querySelector(".vacancy__title span")
        .textContent
      this.currentModal.classList.add("opened")
      this.bodyNode.classList.add("no-scroll")
      this.currentModal.addEventListener("click", this.closeModalBind)
      window.addEventListener("keyup", this.closeModalBind)
      console.log(this.currentModal)
      this.currentModal
        .querySelector("form")
        .addEventListener("submit", this.sendVacancyDataBind)
    },
    closeModal({key, keyCode, code, target, type}) {
      if (type === "keyup") {
        if (key === "Escape" || code === "Escape" || keyCode === 27) {
          this.currentModal.classList.remove('opened')
          this.bodyNode.classList.remove("no-scroll")
          this.currentModal.removeEventListener("click", this.closeModalBind)
          window.removeEventListener("keyup", this.closeModalBind)
          this.currentModal = null
        }
      }
      if (type === "click") {
        if (target.closest(".modal__body")) {
        
        } else {
          this.currentModal.classList.remove('opened')
          this.bodyNode.classList.remove("no-scroll")
          this.currentModal.removeEventListener("click", this.closeModalBind)
          window.removeEventListener("keyup", this.closeModalBind)
          this.currentModal = null
        }
      }
    },

    getVacancyData() {
      const form = document.forms["vacancy-form"]
      const formData = new FormData(form)
      const data = {}
      let hasError = false
      for (let pair of formData.entries()) {
        if (pair[0] === "phone") {
          const input = form.querySelector("[name='phone']").closest(".form-input")
          if (!formUtils.isValidatePhone(pair[1])) {
            input.classList.add("error")
            hasError = true
            input.addEventListener("input", ({target}) => {
              if (formUtils.isValidatePhone(target.value)) this.removeInputError(target)
            })
          } else {
            input.classList.remove("error")
            data[`${pair[0]}`] = pair[1]
          }
          continue
        }
        if (pair[0] === "mail") {
          const input = form.querySelector("[name='mail']").closest(".form-input")
          if (!formUtils.isValidMail(pair[1])) {
            input.classList.add("error")
            hasError = true
            input.addEventListener("input", ({target}) => {
              if (formUtils.isValidMail(target.value)) this.removeInputError(target)
            })
          } else {
            input.classList.remove("error")
            data[`${pair[0]}`] = pair[1]
          }
          continue
        }
        data[`${pair[0]}`] = pair[1]
      }
      return {
        data, hasError
      }
    },
    sendVacancyData(event) {
      event.preventDefault();
      const url = "string url"
      const {data, hasError} = this.getVacancyData()
      if (hasError) {
        console.log("error")
        return false
      } else {
        console.log("clean")
        if (url !== "string url") {
          fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
          }).then(res => res.json()).then(data => {
            console.log(data)
            if (!data?.error) {
              this.showSuccessVacancyBind()
            }
          })
        } else {
          this.showSuccessVacancyBind()
        }
        // setTimeout(, 3000)
      
        // fetch(url, {
        //   method: "POST",
        //   body: JSON.stringify(formData)
        // }).then(res => res.json()).then(data => {
        //   console.log(data)
        //   if (!data?.error) {
        //     successForm.style.display = "flex"
        //     for (let key in formData) {
        //       if (formData.hasOwnProperty(key)) {
        //         formData[key] = "";
        //         const input = document.querySelector(`[name="${key}"]`)
        //         input.value = ""
        //       }
        //     }
        //     setTimeout(() => {
        //       successForm.style.display = "none"
        //     }, 2000)
        //   }
        // })
      // console.log(data)
      }
    },
    showSuccessVacancy() {
      const modalSuccess = document.querySelector("[data-modal-name='success-vacancy']")
      this.currentModal.classList.remove("opened")
      // this.currentModal = null
      modalSuccess.classList.add("opened")
      setTimeout(function() {
        modalSuccess.classList.remove("opened")
      }, 2000)
      
    },
    removeInputError(node) {
      node.closest(".form-input").classList.remove("error")
    },
    init() {
      this.removeInputErrorBind = this.removeInputError.bind(this)
      this.showModalBind = this.showModal.bind(this)
      this.closeModalBind = this.closeModal.bind(this)
      this.sendVacancyDataBind = this.sendVacancyData.bind(this)
      this.showSuccessVacancyBind = this.showSuccessVacancy.bind(this)
      this.addListeners()
    }
  }
  
  const toggle = {
    titles: document.querySelectorAll(".toggle-title"),
    toggle({target}) {
      const node = target.closest(".toggle-title")
      const content = node.nextElementSibling
      const height = content.scrollHeight
      node.classList.toggle("opened")
      if (node.classList.contains("opened"))
        content.style.maxHeight = `${height}px`
      else
        content.style.maxHeight = `0px`
    },
    
    init() {
      this.titles.forEach(title => {
        title.addEventListener("click", this.toggle.bind(this))
      })
    }
  }
  
  const friendsForm = {
    form: document.forms["friends-form"],
    init() {
      if (this.form) {
        this.form.addEventListener("submit", formUtils.sendData.bind(formUtils, "friends-form", "url"))
      }
    }
  }
  
  const dispatchForm = {
    form: document.forms["dispatch-form"],
    init() {
      if (this.form) {
        this.form.addEventListener("submit", formUtils.sendData.bind(formUtils, "dispatch-form", "url"))
      }
    }
  }
  
  const articleMainPicture = {
    picture: document.querySelector(".article-content__main-picture"),
    introBlock: document.querySelector(".article"),
    contentBlock: document.querySelector(".article-content"),
    
    setMarginContent() {
      this.contentBlock.style.marginTop = `-${this.pictureHeight / 2}px`
    },
    setIntroPadding() {
      this.introBlock.style.paddingBottom = `${this.pictureHeight / 2}px`
    },
    setStyles() {
      this.pictureHeight = this.picture.clientHeight
      this.setIntroPadding()
      this.setMarginContent()
      this.section.style.paddingTop = `30px`
    },
    addListener() {
      window.addEventListener("resize", this.setStyleBind)
    },
    init() {
      if (this.picture) {
        this.section = this.contentBlock.querySelector(".section")
        this.setStyleBind = this.setStyles.bind(this)
        this.setStyles()
        this.addListener()
      }
      
    }
  }
  
  const ageInputs = {
    min: document.querySelector("input[name='age-from']"),
    max: document.querySelector("input[name='age-to']"),
  }
  
  
  const costInputs = {
    min: document.querySelector("input[name='cost-from']"),
    max: document.querySelector("input[name='cost-to']"),
  }
  
  if (ageInputs.min && ageInputs.max) {
    ageInputs.min.value = ageInputs.min.getAttribute("data-v").replace(/\D/g, "")
    ageInputs.max.value = ageInputs.max.getAttribute("data-v").replace(/\D/g, "")
    const params = {
      values: [
        ageInputs.min.getAttribute("data-v"),
        ageInputs.max.getAttribute("data-v")
      ],
      current: [
        ageInputs.min.value,
        ageInputs.max.value
      ],
      range: document.querySelector(".static-range-age"),
      slide: true
    }
    
    const ageRange = new K1StaticRange(params);
    ageInputs.min.addEventListener("input", ageRange.setCurrentValue.bind(ageRange))
    ageInputs.max.addEventListener("input", ageRange.setCurrentValue.bind(ageRange))
    ageRange.init()
    
    ageRange.range.addEventListener("afterChange", function () {
      const values = ageRange.getCurrentValue()
      ageInputs.min.value = values.min.value
      ageInputs.max.value = values.max.value
    })
    
  }
  
  if (costInputs.min && costInputs.max) {
    costInputs.min.value = costInputs.min.getAttribute("data-v").replace(/\D/g, "")
    costInputs.max.value = costInputs.max.getAttribute("data-v").replace(/\D/g, "")
    const params = {
      values: [
        +costInputs.min.getAttribute("data-v").replace(/\D/g, ""),
        +costInputs.max.getAttribute("data-v").replace(/\D/g, "")
      ],
      current: [
        +costInputs.min.value.replace(/\D/g, ""),
        +costInputs.max.value.replace(/\D/g, "")
      ],
      range: document.querySelector(".static-range-cost"),
      slide: true
    }
    
    
    
    const costRange = new K1StaticRange(params);
    costInputs.min.addEventListener("input", costRange.setCurrentValue.bind(costRange))
    costInputs.max.addEventListener("input", costRange.setCurrentValue.bind(costRange))
    costRange.init()

    costRange.range.addEventListener("afterChange", function () {
      const values = costRange.getCurrentValue()
      costInputs.min.value = values.min.value
      costInputs.max.value = values.max.value.toLocaleString()
    })
    
    const b = document.querySelector(".static-range-cost")
    
    window.addEventListener("resize", function() {
      // console.log(b.clientWidth)
      // costRange.getPlaceholder().style.width = `${b.clientWidth}px`
    })
  
  }
  
  const selectCustom = {
    elements: document.querySelectorAll(".select-custom"),
    valueHandler() {},
    toggleList({target}) {
      const block = target.closest(".select-custom")
      block.classList.toggle("opened")
      if (block.classList.contains("opened")) {
        this.listBlock.style.maxHeight = `${this.list.scrollHeight + 2}px`
      } else {
        this.listBlock.style.maxHeight = `0px`
      }
      
    },
    closeList() {
      this.listBlock.closest(".select-custom").classList.remove("opened")
      this.listBlock.style.maxHeight = `0px`
    },
    chooseValue({target}) {
      const value = target.textContent
      this.label.style.opacity = `0`
      this.input.value = value
      this.closeList()
    },
    init() {
      if (this.elements.length ) {
        this.elements.forEach(elem => {
          
          const toggleNode = elem.querySelector(".select-custom__value")
          this.listBlock = elem.querySelector(".select-custom__list")
          this.list = this.listBlock.querySelector("ul")
          this.listItems = this.list.querySelectorAll("li")
          this.label = toggleNode.querySelector("label")
          this.input = toggleNode.querySelector("input")
          this.input.value = ""
          const chooseBind = this.chooseValue.bind(this)
          this.listItems.forEach(li => {
            li.addEventListener("click", chooseBind)
          })
          const toggleBind = this.toggleList.bind(this)
          toggleNode.addEventListener("click", toggleBind)
        })
      }
    }
  }
  
  // window.addEventListener("click", ({target}) =>  {
  //   console.log(target)})
  
  
  selectCustom.init()
  articleMainPicture.init()
  friendsForm.init()
  dispatchForm.init()
  toggle.init();
  modal.init()
  headerActions.init()
  circleProgress.init()


})