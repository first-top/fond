window.addEventListener("DOMContentLoaded", () => {
  const choose = {
    blocks: document.querySelectorAll(".variants-js"),
    intervalInputs: document.querySelectorAll("input[name='pay-interval']"),
    payMethodBlock: document.querySelector(".card__method"),
    changeTab(name) {
      if (!name) return
      let current = ""
      const nodes = document.querySelectorAll(`[data-tab=${name}]`)
      nodes.forEach(node => {
        if (node.getAttribute("data-target-content")) {
          node.classList.remove("opened")
        }
        if (node.getAttribute("data-target") && node.classList.contains("chosen")) {
          current = node.getAttribute("data-target")
        }
      });
      [...nodes].filter(node => {
        if (node.getAttribute("data-target-content") === current) {
          node.classList.add("opened")
        }
      })
    },
    showCurrentPay(val) {
      const cardPayBlock = document.querySelector(".card__credit")
      const smsPayBlock = document.querySelector(".card__sms")
      if (val === "monthly") {
        if (!cardPayBlock.classList.contains("opened")) {
          cardPayBlock.classList.add("opened")
          smsPayBlock.classList.remove("opened")
        }
        return
      }
      const currentPayMethod = [...document
        .querySelectorAll("li[data-tab='pay']")]
        .filter(elem => elem.classList.contains("chosen"))[0]
        .getAttribute("data-target")
      if (currentPayMethod === "pay-sms") {
        cardPayBlock.classList.remove("opened")
        smsPayBlock.classList.add("opened")
      } else {
        cardPayBlock.classList.add("opened")
        smsPayBlock.classList.remove("opened")
      }
    },
    init() {
      // this.setPayMethodOnLoad()
      const _this = this
      if (this.blocks.length) {
        this.blocks.forEach(block => {
          const items = block.querySelectorAll("li")
          const type = block.getAttribute("data-variant")
          items.forEach(li => {
            li.addEventListener("click", function () {
              if (type === "cost") {
                const toggleBlock = document.querySelector(".card__custom-cost")
                const body = toggleBlock.querySelector(".card__custom-cost-body")
                
                items.forEach(item => item.classList.remove("chosen"))
                if (this.classList.contains("variants-js-show")) {
                  toggleBlock.style.maxHeight = `${body.scrollHeight}px`
                } else {
                  toggleBlock.style.maxHeight = `0px`
                }
                this.classList.add("chosen")
              }
              if (type === "method") {
                items.forEach(item => item.classList.remove("chosen"))
                this.classList.add("chosen")
                _this.changeTab(this.getAttribute("data-tab"))
              }
            })
          })
        })
      }
      if (this.intervalInputs.length) {
        [...this.intervalInputs].filter(input => {
          if (input.checked) {
            if (input.value === "monthly") {
              _this.payMethodBlock.style.display = "none"
              _this.showCurrentPay(input.value)
            }
            else
              _this.payMethodBlock.style.display = "block"
          }
        })
        this.intervalInputs.forEach(input => {
          input.addEventListener("change", ({target}) => {
            if (target.value === "monthly") {
              _this.payMethodBlock.style.display = "none"
            }
            else
              _this.payMethodBlock.style.display = "block"
  
            _this.showCurrentPay(input.value)
          })
        })
      }
    }
  }
  choose.init()
})