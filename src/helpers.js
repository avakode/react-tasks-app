export const getCookieValue = name => {
  return document.cookie && document.cookie.indexOf(name) !== -1 ? document.cookie
    .split('; ')
    .find(row => row.startsWith(name))
    .split('=')[1]
  : null
}

export const getStatusLabel = status => {
 if (status === 0)  {
   return 'Incompleted'
 } else if (status === 1) {
   return 'Incompleted and modified by admin'
 } else if (status === 10) {
   return 'Completed'
 }
  return 'Completed and modified by admin'
 }
 
 export const changeStatus = status => {
 if (status === 0)  {
   return 10
 } else if (status === 1) {
   return 11
 } else if (status === 10) {
   return 0
 }
  return 1
}

export const decodeEntities = (text) => {
  const span = document.createElement('span');

  if (text) {
    return text
    .replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
      span.innerHTML = entity;
      return span.innerText;
    })
  }

  return null
}