const positionData = [
  {
    code: 'PO100',
    name: 'frontend',
    groupCode: 'PO',
    groupName: '포지션 구분',
  },
  {
    code: 'PO101',
    name: 'backend',
    groupCode: 'PO',
    groupName: '포지션 구분',
  },
  {
    code: 'PO102',
    name: '디자이너',
    groupCode: 'PO',
    groupName: '포지션 구분',
  },
  {
    code: 'PO103',
    name: 'pm',
    groupCode: 'PO',
    groupName: '포지션 구분',
  },
  {
    code: 'PO104',
    name: 'da',
    groupCode: 'PO',
    groupName: '포지션 구분',
  },
]

function getPositionName(code) {
  let name = 'error'
  positionData.forEach(function (item) {
    if (item.code === code) name = item.name
  })
  return name
}

export { positionData, getPositionName }
