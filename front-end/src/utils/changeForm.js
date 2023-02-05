export const changeSkillForm = (list) => {
  return list.map((item) => {
    return { value: item.code, label: item.name }
  })
}
