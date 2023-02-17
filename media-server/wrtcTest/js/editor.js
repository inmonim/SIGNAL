
let filename;  //서버에 저장되는 파일이름

let fileExt="text"


let version; //수정 버전
let content;  //코드 내용
let loaded = false;
let Range = ace.require('ace/range').Range;

let cursors = {};  //다른 유저의 커서위치 저장

var editor = ace.edit("editor");
editor.setTheme("ace/theme/idle_fingers");
editor.getSession().setMode("ace/mode/text");
editor.getSession().on('change', function(e) {
    if(!loaded || typeof filename == 'undefined') return;
    //console.log(e.data);
    console.log(e.data.action);
    switch(e.data.action) {
        case "insertText":
            socket.emit('post', {version: version++, position: translatePosition(e.data.range.start), insert: e.data.text}, success_cb);
        break;

        case "removeText":
            socket.emit('post', {version: version++, position: translatePosition(e.data.range.start), remove: e.data.text.length}, success_cb);
        break;

        case "insertLines":
            var t = "";
            for(var i=0; i<e.data.lines.length; i++) t += e.data.lines[i]+"\n";
            socket.emit('post', {version: version++, position: translatePosition(e.data.range.start), insert: t}, success_cb);
        break;

        case "removeLines":
            var l = 0;
            for(var i=0; i<e.data.lines.length; i++) l += e.data.lines[i].length+1;
            socket.emit('post', {version: version++, position: translatePosition(e.data.range.start), remove: l}, success_cb);
        break;
    }
});
editor.getSession().selection.on('changeCursor', function(e) {
    if(!loaded || typeof filename == 'undefined') return;
    socket.emit('cursor', editor.selection.getCursor());
});




onload3()
function onload3() {
    
    filename = roomId+".txt";
    

    //코드편집기의 타입 SELECT
    document.querySelector("#select-ext").addEventListener("change", function (){ 
        fileExt = document.querySelector("#select-ext").value;
        console.log("ext:",fileExt)
        editor.getSession().setMode("ace/mode/"+fileExt);
    });


    socket.emit('open',{
        filename,
        roomId,
        userName:myName,
    })

    document.querySelector("#status_btn").onclick = showStatus

}
function showStatus(){
    //socket.emit("show_status")
    /*myStream.getVideoTracks().forEach(ele=>{
        console.log(ele.getSettings());
    })*/
}

var success_cb = function(data) {
    if(!data.success) {
        console.error("Operation dropped");
    } else {version = data.version;}
}

var translatePosition = function(pos) {
    var p = 0;
    for(var i=0; i<pos.row; i++) p += editor.getSession().getLine(i).length+1;
    p += pos.column;
    return p;
}

var translatePositionBack = function(pos) {
    var p = {row: 0, column: 0};
    for(var i=0; editor.getSession().getLine(i).length < pos; i++) {
        p.row ++;
        pos -= editor.getSession().getLine(i).length+1;
    }
    p.column = pos;
    return p;
}

var applyOperation = function(operation)
{
    loaded = false;
    console.log("operation:",operation);
    if(typeof operation.insert !== 'undefined') {
        editor.getSession().insert(translatePositionBack(operation.position), operation.insert);
    } else if(typeof operation.remove !== 'undefined') {
        var start = translatePositionBack(operation.position);
        var end = translatePositionBack(operation.position+operation.remove);
        editor.getSession().remove(new Range(start.row, start.column, end.row, end.column));
    }
    version = operation.version+1;
    loaded = true;
}

//처음에 파일 정보 받음
socket.on('open', function(data) {
    loaded = false;
    version = data.version;
    content = data.content;
    editor.getSession().setValue(content);

    var ext = fileExt;
    if(typeof ext !== 'undefined' && typeof ext !== 'undefined') {
        editor.getSession().setMode("ace/mode/"+ext);
    } else {
        editor.getSession().setMode("ace/mode/text");
    }
    console.log("Editor started for file "+filename+" with document version "+version);
    loaded = true;
});

//다른 유저의 커서가 변경시
socket.on('cursor', function(data) {
    //console.log("cursor on", data.user)
    if(typeof cursors[data.user] !== "undefined"){
        editor.getSession().removeMarker(cursors[data.user])
    }

    cursors[data.user] = editor.getSession().addMarker(new Range(data.cursor.row, data.cursor.column, data.cursor.row, data.cursor.column+1), "ace_cursor", data.user);
});

//상대가 나가면 커서지움
socket.on('cursorremove', function(user) {
    if(typeof cursors[user] == 'undefined') return;
    editor.getSession().removeMarker(cursors[user]);
    delete cursors[user];
});

// 이 코드는 안씀
socket.on('disconnect', function() {
    for(var otheruser in cursors) {
        if(!cursors.hasOwnProperty(otheruser)) continue;
        editor.getSession().removeMarker(cursors[otheruser]);
        delete cursors[otheruser];
    }
});

//다른 유저가 코드편집
socket.on('operation', function(operation) {
    applyOperation(operation);
});

//코드에 문제생기면 롤백
socket.on('rollback', function(data) {
    console.log("페이지 롤백함!")
    loaded = false;
    version = data.version;
    content = data.content;
    editor.getSession().setValue(content); //코드 롤백
    editor.moveCursorTo(data.cursor.row, data.cursor.column); //커서 롤백
    loaded = true;
    console.log("커서",data.cursor.row, data.cursor.column,"로 롤백함")
});

