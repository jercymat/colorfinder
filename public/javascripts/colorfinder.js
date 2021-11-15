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
var CURR_ROUND = 0; // 目前關卡
var PREV_DIFFTILE = -1; // 上次異色色塊的編號
var CURR_DIFFTILE = -1; // 異色色塊的編號

var timer = null;

// 初始化遊戲
$(document).ready(() => {
  // genNewTiles(CURR_ROUND);
});

// 選到正確的色塊即進入下一關
$(document).on('click', '#board > div', function() {
  let clickedID = parseInt($(this).attr('id').substring(5));
  gameAnswering(clickedID);
});

$(document).on('click', '#btn-start-game', function () {
  startGame();
});

$(document).on('click', '#btn-back-home', function() {
  resetGame();
});

function resetGame() {
  $('#result').addClass('d-none');
  $('#game-start-area').removeClass('d-none');
  $('#text-curr-round').text('ROUND 1');

  CURR_ROUND = 0;
  PREV_DIFFTILE = -1;
  CURR_DIFFTILE = -1;
}

function startGame() {
  $('#game-start-area').addClass('d-none');
  genNewTiles(CURR_ROUND);
  timer = new Timer(60);
  timer.start(() => {
    showResult();
  });
}

// 選擇色塊
// @param:  tileNo: Int | 選擇色塊編號
function gameAnswering(tileNo) {
  if (tileNo == CURR_DIFFTILE) {
    timer.updateTime(1);
    CURR_ROUND++;
    $('#text-curr-round').text(`ROUND ${CURR_ROUND + 1}`);
    timeDelta(true);
    genNewTiles(CURR_ROUND);
  } else {
    timer.updateTime(-2);
    timeDelta(false);
    errorAnimation();
  }
}

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

function showResult() {
  let levelTitleList = ['白天的蜥蜴', '蛇', '鯊魚', '刺蝟', '牛', '貓', '蜜蜂', '猴子', '鳥', '老鷹'];
  let hintList = [
    '色盲，難以分清各種綠色植物。該看醫生囉!',
    '視力很差，幾乎色盲，必須靠著嗅覺接收氣味顆粒，透過住鼻器的轉換，才可將嗅覺轉換為影像。',
    '眼前畫面只有黑與白二色，即使身存在五彩繽紛的海水中，卻無法欣賞，令人心疼。與蛇相同一樣需要透過別的感官協助視力，例如:嗅覺等。',
    '能分出來哪個顏色不一樣嗎？如果可以，你的眼力就達到刺蝟程度了！',
    '在處理綠色這個顏色的時候，牛眼呈現更多的是紅色和橙色的效果。牛所看出的景象有點類似復古照片的感覺。',
    '貓咪不全然是色盲，它們能夠分辨出藍色、綠色、紫色、黃色。對於紅色、橘色、棕色這幾種顏色，貓咪看到的是黑色到灰色階。',
    '蜜蜂的眼睛能分辨光的色澤，與人眼有些相似，主要差別是蜜蜂對紅色不敏感，對紫外光線特別敏感。除此之外，蜜蜂眼睛中的白色是由黃、藍、紫3種顏色（或2種補色）混合而成，而不是七色光混合而成。',
    '猴子又分成三種：新世界猴、舊世界猴和猿。舊大陸猴的視覺能力通常與人類相近，和我們一樣有三色視覺能力。',
    '與人類相比，鳥類的眼睛色彩更鮮明，更多樣！既有常見的褐色虹膜，又有灰色、紅色、綠色、黃色等等。鳥眼中的世界，更有童話色彩!',
    '能答那麼多題，你一定是「鷹眼」啦!老鷹的視力敏銳度約為人眼8倍!!'
  ];
  var level = 0;

  switch (true) {
    case (CURR_ROUND == 0):
      level = 0;
      break;
    case (CURR_ROUND <= 4):
      level = 1;
      break;
    case (CURR_ROUND <= 8):
      level = 2;
      break;
    case (CURR_ROUND <= 15):
      level = 3;
      break;
    case (CURR_ROUND <= 20):
      level = 4;
      break;
    case (CURR_ROUND <= 25):
      level = 5;
      break;
    case (CURR_ROUND <= 30):
      level = 6;
      break;
    case (CURR_ROUND <= 40):
      level = 7;
      break;
    case (CURR_ROUND <= 50):
      level = 8;
      break;
    default:
      level = 9;
      break;
  }

  console.log(`level: ${level}`);

  $('#result-img').attr('src', `/images/game-results/${level}.jpg`);
  $('#result-hint').text(hintList[level]);
  $('#result-title').text(levelTitleList[level]);
  $('#board').addClass('d-none');
  $('#result').removeClass('d-none');
}

async function errorAnimation() {
  $('html').addClass('warn');
  await new Promise(r => setTimeout(r, 10));
  $('html').addClass('animated');
  $('html').removeClass('warn');
  await new Promise(r => setTimeout(r, 750));
  $('html').removeClass('animated');
}

async function timeDelta(postiveOrNegative) {
  let now = new Date();
  let timestamp = Math.floor(now);
  let label = $('<h2/>', {
    id: `time-delta-${timestamp}`,
    class: `time-delta ${postiveOrNegative ? 'text-success' : 'text-danger'}`,
    style: 'font-weight: 700;'
  }).text(postiveOrNegative ? '+1s' : '-2s');

  console.log(label);

  $('#timer').after(label);
  await new Promise(r => setTimeout(r, 10));
  $(`#time-delta-${timestamp}`).css('opacity', '0');
  await new Promise(r => setTimeout(r, 750));
  $(`#time-delta-${timestamp}`).remove();
}