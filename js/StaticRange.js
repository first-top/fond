class K1StaticRange {
  constructor(params) {
    this.values = params.values
    this.range = params.range
    this.slide = params.slide
    this.currentValue = this.values[0]
    this.markersData = {
      min: {},
      max: {}
    }
    this.markers = null
    this.bindMarker = this.bindMarkerFunc.bind(this)
    this.currentNode = null
    this.bindRemoveCurrentClass = this.removeCurrentClass.bind(this)
    this.countMinLimit = this.values[0]
    this.distanceDisabled = null
    this.disabledPlaceholder = this.range.querySelector(".static-range__placeholder--disabled")
    this.placeholder = this.range.querySelector(".static-range__placeholder")
    this.currentMarker = null
    this.eventAfterChange = null
  }
  
  setDisabledDistance(val) {
    if (val !== undefined) {
      this.disabledPlaceholder.style.width = val
      return false
    }
    const limitLeft = this.countMinLimit.getBoundingClientRect().left
    const rangeLeft = this.range.getBoundingClientRect().left
    const different = limitLeft - rangeLeft;
    this.disabledPlaceholder.style.width = different + "px"
  }
  
  disableValues(value) {
    // const a = 5
    if (value > this.values[0]) {
      
      for (let val of this.markers) {
        const markerValue = val.getAttribute("data-value")
        if (+markerValue < value) {
          val.classList.add("disabled")
        } else {
          this.countMinLimit = val
          this.bindRemoveCurrentClass(this.markers)
          this.addCurrentClass(val)
          this.setDisabledDistance()
          break;
        }
      }
    }
  }
  
  enableValues() {
    for (let val of this.markers) {
      val.classList.remove("disabled")
    }
    this.setDisabledDistance(0)
  }
  
  makeValuesWrapper() {
    const node = document.createElement("div")
    node.classList.add("static-range__markers-wrapper")
    this.range.append(node)
    return node
  }
  
  makeValuesMarkers() {
    const node = document.createElement("div")
    node.classList.add("static-range__marker")
    return node
  }
  
  makeMarkerDescription(elem, attr) {
    const node = document.createElement("span")
    node.classList.add("static-range__marker-value")
    node.textContent = elem.getAttribute(attr)
    elem.append(node)
  }
  
  setMarkerPosition(marker, percent) {
    marker.style.left = `${percent}%`
  }
  
  getRangePosition() {
    const {x, y, width} = this.range.getBoundingClientRect()
    return {x, y, width}
  }
  
  putMarkers(arr) {
    const valuesBox = this.makeValuesWrapper()
    const attr = "data-value"
    arr.forEach(elem => {
      const marker = this.makeValuesMarkers()
      valuesBox.append(marker)
      marker.setAttribute(attr, elem)
      this.makeMarkerDescription(marker, attr)
      if (this.markers === null) {
        this.markers = []
        this.markers.push(marker)
      } else {
        this.markers.push(marker)
      }
    })
  }
  
  removeCurrentClass(arr) {
    arr.forEach(elem => {
      elem.classList.remove("current")
    })
    // this.addCurrentClass()
  }
  
  addCurrentClass(node) {
    node.classList.add("current")
  }
  
  bindMarkerFunc(arr) {
    arr.forEach(marker => {
      marker.addEventListener("click", event => {
        this.bindRemoveCurrentClass(arr)
        this.currentNode = event.target.closest(".static-range__marker")
        this.currentValue = this.currentNode.getAttribute("data-value")
        this.addCurrentClass(this.currentNode)
        this.eventAfterChange = new CustomEvent("afterChange")
        this.range.dispatchEvent(this.eventAfterChange)
      })
    })
  }
  
  setCurrentValue() {
  
  }
  
  getCurrentValue() {
    return this.currentValue
  }
  
  getPercent() {
  
  }
  
  
  moveHandler({x}) {
    const {x: rangeX, width} = this.getRangePosition()
    if (!this.currentMarker) return false
    if (x >= rangeX && x <= width + rangeX) {
      this.setMarkerPosition(this.currentMarker, (x - rangeX) / width * 100)
    }
    if (x > width + rangeX) {
      this.setMarkerPosition(this.currentMarker, 100)
    }
    if (x < rangeX) {
      this.setMarkerPosition(this.currentMarker, 0)
    }
    this.setStrokeStyle()
    // marker.addEventListener("touchstart", () => {
  }
  
  clickHandler({target}) {
    const marker = target.closest('[data-value]')
    const _this = this
    
  }
  
  bindSlideMarkers() {
    this.markers.forEach(marker => {
      marker.addEventListener("mousedown", () => {
        this.currentMarker = marker
        window.addEventListener("mousemove", this.moveHandlerBind)
      })
      
      // marker.addEventListener("mousedown", this.clickHandlerBind)
     
    })
  }
  
  setStrokeStyle() {
    const {left} = window.getComputedStyle(this.markers[0])
    const {left: right} = window.getComputedStyle(this.markers[1])
    console.log(left)
    const pos = {
      left: parseInt(left.replace("px", "")),
      right: parseInt(right.replace("px", "")),
    }
    console.log(pos.left)
    this.placeholder.style.left = `${pos.left}px`
    this.placeholder.style.width = `${pos.right - pos.left}px`
  }
  
  init() {
    this.putMarkers(this.values)
    
    if (!this.slide) {
      
      // if (this.markers) {
      //   this.bindMarkerFunc(this.markers)
      //   this.addCurrentClass(this.markers[0])
      // }
      // this.disableValues()
    } else {
      this.moveHandlerBind = this.moveHandler.bind(this)
      this.clickHandlerBind = this.clickHandler.bind(this)
      const {x, width} = this.getRangePosition()
      window.addEventListener("mouseup", () => {
        this.currentMarker = null
        window.removeEventListener("mousemove", this.moveHandlerBind)
      })
      this.setMarkerPosition(this.markers[0], 0)
      this.setMarkerPosition(this.markers[1], 100)
      this.bindSlideMarkers()
    }
  }
}





















