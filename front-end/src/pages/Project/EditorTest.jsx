import React, { useEffect } from 'react'
// import { Range } from 'ace-builds'
// import AceEditor from 'react-ace'
let ace, editor

function EditorTest() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ace = require('brace')
    }
    require(`brace/mode/javascript`)
    require(`brace/theme/idle_fingers`)
    editor = ace.edit('ace-editor')
    editor.getSession().setMode(`ace/mode/javascript`)
    editor.setTheme(`ace/theme/idle_fingers`)
    editor.setFontSize(20)
    editor.setOption('fontFamily', 'Courier New, Courier, monospace')
    // editor.getSession().setTabSize(4)
    // editor.setShowInvisibles(false)
    // editor.renderer.setShowPrintMargin(true)
    editor.getSession().on('change', function (e) {
      console.log(e.data.action)
    })
    // console.log(Range(1, 2, 3, 3))
  }, [])

  return (
    <div>
      <div id="ace-editor" style={{ width: '1400px', height: '1400px', fontFamily: 'Georgia , sansSerif' }}></div>
    </div>
  )
}
export default EditorTest
