let ROUND_TO_LEVEL = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8]; // 每回合的色塊邊長(第21關後為9)
let COLORS = [
  // 易
  ["ffd84e", "f9fb9d"],
  ["e972b5", "f9a2c0"],
  ["96483e", "ac6c4f"],
  ["76a4de", "71c4ff"],
  ["619561", "92d07f"],
  ["7f7f7f", "c0c0c0"],
  // 中
  ["e9e0d2", "ecece7"],
  ["007cb0", "0089b6"],
  ["7ebab5", "78afb9"],
  ["6e6387", "816183"],
  ["f4a083", "f4b183"],
  // 難
  ["2b2537", "262626"],
  ["005e83", "004f7c"],
  ["cb7379", "cb786e"],
  ["9b1e14", "9b2423"]
]; // 所有顏色
var CURR_ROUND = 0 // 目前關卡
var PREV_DIFFTILE = -1; // 上次異色色塊的編號
var CURR_DIFFTILE = -1; // 異色色塊的編號

// 初始化遊戲
$(document).ready(() => {
  genNewTiles(CURR_ROUND);
});

// 選到正確的色塊即進入下一關
$(document).on('click', '#board > div', function() {
  let clickedID = parseInt($(this).attr('id').substring(5))
  if (clickedID == CURR_DIFFTILE) {
    CURR_ROUND++;
    $('#text-curr-round').text(`ROUND ${CURR_ROUND+1}`);
    genNewTiles(CURR_ROUND);
  }
});

// @param:  round: Int | 回合
function genNewTiles(round) {
  let level = round >= 20 ? 9 : ROUND_TO_LEVEL[round];
  let tileCnt = Math.pow((level + 1), 2); // 色塊數量
  var sameTileColor = "ffffff";
  var diffTileColor = "000000";
  if (CURR_ROUND >= 15) {
    let colorPair = Math.floor(Math.random() * Math.floor(15));
    sameTileColor = COLORS[colorPair][0];
    diffTileColor = COLORS[colorPair][1];
  } else {
    sameTileColor = COLORS[CURR_ROUND][0];
    diffTileColor = COLORS[CURR_ROUND][1];
  }

  // 產生隨機位置，但不與上次位置重複
  while (CURR_DIFFTILE == PREV_DIFFTILE) {
    CURR_DIFFTILE = Math.floor(Math.random() * Math.floor(tileCnt));
  }
  PREV_DIFFTILE = CURR_DIFFTILE;

  $('#board').empty();
  $('#board').removeClass();
  $('#board').addClass(`lv${level}`);

  for (var i = 0; i < tileCnt; i++) {
    $('#board').append(
      $('<div/>', {
        id: `tile-${i}`,
        style: `background-color: #${i == CURR_DIFFTILE ? diffTileColor : sameTileColor};`
      }));
  }
}