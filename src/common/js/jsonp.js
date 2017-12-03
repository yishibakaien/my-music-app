import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (let key in data) {
    let val = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(val)}`
  }
  return url ? url.substring(1) : ''
}