import { isMobile as deviceIsMobile } from "react-device-detect"

export function range(n) { return [...Array(n).keys()] }

export function capitalize(string) {
   if (!(typeof string === 'string' || string instanceof String)) return ""
   let arr = string.split(' ')
   arr = arr.map(word => `${word[0].toUpperCase()}${word.substring(1)}`)
   return arr.join(' ')
}

export const isMobile = (override = true) => {
   if (!override) return false
   return window?.screen?.orientation?.type && 
      !window?.screen?.orientation?.type.includes("landscape") && 
      deviceIsMobile || window.matchMedia && 
      window.matchMedia("(max-width: 600px)").matches
}

export const isDarkMode = window => {
   return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function insertAfter(newNode, existingNode) {
   existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

export function exportPDF(query) {
   console.log(`exportPDF(${query})`)
   window.print()
}

export function getCurrentDate() {
   return new Date()
}

export const statusNames = {
   0: "stamp",
   1: "spray",
   2: "check",
   3: "oil",
   4: "bag",
   5: "complete",

   get: function(statusId) {
      if (Number.isInteger(statusId) && statusId >= 0 && statusId <= 5)
         return this[statusId]
      else return "unknown status"
   },

   getNumber: function(statusStr) {
      if (statusStr === "CompletedParts") return 5
      let status = 0
      range(6).forEach(i => { if (this.matches(i, statusStr)) status = i })
      return status
   },

   getArray: function() {
      let arr = []
      range(6).forEach(i => arr.push(this[i]))
      return arr
   },

   getUrl: function(statusId) {
      if (!range(6).includes(statusId)) return ""
      return this[statusId]
   },

   isOilStatus: function(statusId) {
      return this[statusId] === "oil"
   },

   matches: function(statusId, statusName) {
      if (typeof statusName !== "string") return false
      return this.get(statusId).toLowerCase() === statusName.toLowerCase()
   },

   next: function(currentStatus) {

      if (typeof currentStatus === "string") {
         switch (currentStatus.toLowerCase()) {
            case "stamp": return "Spray"
            case "spray": return "Check"
            case "check": return "Oil"
            case "oil": return "Bag"
            case "bag": return "CompletedParts"
            default: return currentStatus
         }
      }

      if (typeof currentStatus === "number" && range(6).includes(currentStatus)) 
         return this.get(currentStatus + 1)

      return this.get(0)
   },

   previous: function(currentStatus) {

      if (typeof currentStatus === "string") {
         switch (currentStatus.toLowerCase()) {
            case "stamp": return "Dashboard"
            case "spray": return "Stamp"
            case "check": return "Spray"
            case "oil": return "Check"
            case "bag": return "Oil"
            default: return currentStatus
         }
      }

      if (typeof currentStatus === "number" && currentStatus !== 0) 
         return this.get(currentStatus - 1)

      // else
      return "Dashboard"
   },

   nextUrl: function(window) {
      return this.next(
         window.location.pathname.replace("/djangoapp/", '').replace('/', '')
      )
   },

   previousUrl: function(window) {
      return this.previous(
         window.location.pathname.replace("/djangoapp/", '').replace('/', '')
      )
   },
}
