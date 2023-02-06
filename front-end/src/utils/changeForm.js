export const changeSelectForm = (list) => {
  return list.map((item) => {
    return { value: item.code, label: item.name }
  })
}
